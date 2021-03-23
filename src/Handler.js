import InvalidTaskType from './InvalidTaskType'

/**
 * An abstract handler class for handling a task.
 * @public
 * @abstract
 */
class Handler {
  /**
   * Creates a new handler instance.
   * @param {string} taskType - The type of task this handler can execute.
   */
  constructor (taskType) {
    /**
     * The type of task this handler can execute.
     * @type string
     * @public
     * @readonly
     */
    this.taskType = taskType
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
    throw new Error('Not yet implemented!')
  }

  /**
   * Executes the given task.
   * @param {Task} task - The task to execute.
   * @throws {InvalidTaskType} If task type does not match handler task type.
   * @public
   * @abstract
   */
  async execute (task) {
    if (task.taskType !== this.taskType) {
      throw new InvalidTaskType(task.taskType, this.taskType)
    }

    throw new Error('Not yet implemented!')
  }
}

export default Handler
