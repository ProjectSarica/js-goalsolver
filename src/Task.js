/**
 * A definition for a task to be completed.
 * @public
 */
class Task {
  /**
   * Creates a new task instance.
   *
   * @param {string} taskType - The type of task to be completed.
   */
  constructor (taskType) {
    /**
     * The type of task.
     * @type string
     * @public
     * @readonly
     */
    this.taskType = taskType
  }
}

export default Task
