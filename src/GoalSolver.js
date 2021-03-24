import { OrTaskHandler, AndTaskHandler } from './handlers'

/**
 * A solver to calculating the best approach to executing the given task, if possible.
 */
class GoalSolver {
  /**
   * Creates a new GoalSolver instance.
   */
  constructor () {
    /**
     * The list of handlers that can be used to execute tasks.
     * @type Handler[]
     * @private
     */
    this.handlers = [
      new OrTaskHandler(this),
      new AndTaskHandler(this)
    ]
  }

  /**
   * Adds a new handler to this solver.
   * @param {Handler} handler - The handler to add.
   */
  addHandler (handler) {
    this.handlers.push(handler)
  }

  /**
   * Removes a handler from this solver.
   * @param {Handler} handler  - The handler to remove.
   */
  removeHandler (handler) {
    const index = this.handlers.indexOf(handler)
    if (index < 0) return
    this.handlers.splice(index, 1)
  }

  /**
   * Estimates the total cost of the heuristic accounting for all child tasks
   * recursively and success probabilities.
   * @param {Heuristic} heuristic - The heuristic to get the full cost of.
   * @param {number} depth - The maximum recursion depth.
   * @returns {number} The full cost of the heuristic.
   */
  async getFullCost (heuristic, depth) {
    let fullCost = heuristic.value / heuristic.successProbability

    if (depth > 1) {
      const promises = []
      for (const childTask of heuristic.childTasks) {
        promises.push(this.getHeuristic(childTask, depth - 1))
      }

      const values = await Promise.all(promises)
      for (const h of values) {
        if (h == null) continue
        fullCost += h.fullCost
      }
    }

    return fullCost
  }

  /**
   * Calculates the heuristic estimate for completing the given task.
   * @param {Task} task - The task to get the heuristic for.
   * @param {number} depth - The maximum search depth. Defaults to 1.
   * @returns {Heuristic|null} The heuristic for the task, or null if the
   * task is not completable.
   */
  async getHeuristic (task, depth = 1) {
    async function resolveHeuristic (handler) {
      const heuristic = await handler.getHeuristic(task)
      if (heuristic == null) return null
      heuristic.fullCost = await this.getFullCost(heuristic, depth)
      return heuristic
    }

    const promises = []
    for (const handler of this.handlers) {
      promises.push(resolveHeuristic(handler))
    }
    const values = await Promise.all(promises)

    let h = null
    for (const heuristic of values) {
      if (h == null || heuristic.fullCost < h.fullCost) {
        h = heuristic
      }
    }

    return h
  }
}

export default GoalSolver
