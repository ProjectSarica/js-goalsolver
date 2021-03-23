import Handler from '../Handler'
import Heuristic from '../Heuristic'
import { OrTask } from '../tasks'
import AggregateError from 'aggregate-error'

/**
 * A basic handler for executing "or" tasks.
 */
class OrTaskHandler extends Handler {
  /**
   * Creates a new Or task handler.
   */
  constructor (goalSolver) {
    super('or')

    /**
     * An instance of the goal solver being used for this handler.
     * @type GoalSolver
     * @private
     * @readonly
     */
    this.goalSolver = goalSolver
  }

  /**
   * Gets the cheapest subtask for the given Or task.
   * @param {Task} task - The task to search against.
   * @returns {Task|null} The cheapest subtask, or null if there isn't one.
   */
  async getCheapestSubtask (task) {
    const promises = []
    for (const subtask of task.subtasks) {
      promises.push(this.goalSolver.getHeuristic(subtask, task.searchDepth))
    }
    const values = await Promise.all(promises)

    let cheapest = null
    let cheapestHeuristic = null
    for (let i = 0; i < values.length; i++) {
      if (values[i] == null) continue

      if (cheapest == null || values[i].fullCost < cheapestHeuristic.fullCost) {
        cheapest = task.subtasks[i]
        cheapestHeuristic = values[i]
      }
    }

    return { cheapest, cheapestHeuristic }
  }

  /**
   * Gets a heuristic estimate for the cost of completing the given task.
   * @param {Task} task - The task to estimate for.
   * @returns {Heuristic|null} The heuristic estimate, or null if the task cannot be completed.
   * @public
   * @abstract
   */
  async getHeuristic (task) {
    if (task.taskType !== this.taskType) return null
    if (task.subtasks.length === 0) return null

    const { cheapest } = await this.getCheapestSubtask(task)
    if (cheapest == null) return null

    const heuristic = new Heuristic(this)
    heuristic.childTasks.push(cheapest)
    return heuristic
  }

  async execute (task) {
    // Make a copy of the task to avoid editing the original object.
    const taskCopy = new OrTask([...task.subtasks])
    taskCopy.searchDepth = task.searchDepth

    const errors = []
    while (taskCopy.subtasks.length > 0) {
      const { cheapest } = this.getCheapestSubtask(taskCopy)

      try {
        await this.goalSolver.execute(cheapest)
        return
      } catch (err) {
        taskCopy.subtasks.splice(taskCopy.subtasks.indexOf(cheapest), 1)
        errors.push(errors)
      }
    }

    throw new AggregateError(errors, 'All subtasks failed!')
  }
}

export default OrTaskHandler
