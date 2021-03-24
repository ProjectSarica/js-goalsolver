import Task from '../Task'

/**
 * A task that succeeds if all of the provided subtasks succeed.
 */
class AndTask extends Task {
  /**
   * Creates a new And task.
   * @param {Task[]} subtasks - A list of subtasks to attempt to complete.
   */
  constructor (subtasks) {
    super('and')

    /**
     * A list of subtasks that should be attempted. Order independent.
     * @type Task[]
     * @public
     * @readonly
     */
    this.subtasks = subtasks

    /**
     * When estimating which child task to attempt next, how deep should the search be?
     * @type number
     * @public
     */
    this.searchDepth = 3

    /**
     * The order in which subtasks are executed. If true, the easiest takes
     * are executed first. If false, harder tasks are executed first.
     * @type boolean
     * @public
     */
    this.easiestFirst = true
  }
}

export default AndTask
