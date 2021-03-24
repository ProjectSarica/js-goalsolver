import Handler from '../Handler'

/**
 * A basic handler for executing "and" tasks.
 * @abstract
 */
class MultiSubtaskHandler extends Handler {
  /**
   * Creates a new multi-subtask handler.
   */
  constructor (taskType, goalSolver) {
    super(taskType)

    /**
     * An instance of the goal solver being used for this handler.
     * @type GoalSolver
     * @private
     * @readonly
     */
    this.goalSolver = goalSolver
  }

  /**
   * Gets the next subtask within the list.
   * @param {Task[]} subtasks - The list of available subtasks.
   * @param {number} searchDepth - The maximum search depth.
   * @param {boolean} easiestFirst - Whether to pick the easiest subtask or the hardest.
   * @returns {Task|null} The next subtask, or null if there isn't one.
   */
  async getNextSubtask (subtasks, searchDepth, easiestFirst) {
    if (subtasks.length === 0) return null

    function compareHeuristics (a, b) {
      if (easiestFirst) {
        return a.fullCost < b.fullCost
      } else {
        return a.fullCost > b.fullCost
      }
    }

    const promises = []
    for (const subtask of subtasks) {
      promises.push(this.goalSolver.getHeuristic(subtask, searchDepth))
    }
    const values = await Promise.all(promises)

    let next = null
    let nextHeuristic = null
    for (let i = 0; i < values.length; i++) {
      if (values[i] == null) continue

      if (nextHeuristic == null || compareHeuristics(values[i].fullCost, nextHeuristic.fullCost)) {
        next = subtasks[i]
        nextHeuristic = values[i]
      }
    }

    return { next, nextHeuristic }
  }
}

export default MultiSubtaskHandler
