import Task from '../Task'

/**
 * A task that succeeds only if the child subtask fails.
 */
class NotTask extends Task {
  /**
   * Creates a new Not task.
   * @param {Task} subtask - A subtasks to attempt to fail.
   */
  constructor (subtask) {
    super('not')

    /**
     * The child subtask that should be attempted.
     * @type Task
     * @public
     * @readonly
     */
    this.subtask = subtask
  }
}

export default NotTask
