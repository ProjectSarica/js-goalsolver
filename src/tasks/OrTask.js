import Task from '../Task'

/**
 * A task that succeeds if at least one of the provided subtasks succeeds.
 */
class OrTask extends Task {
  /**
   * Creates a new Or task.
   * @param {Task[]} subtasks - A list of subtasks to attempt to complete.
   */
  constructor (subtasks) {
    super('or')

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
      * The order in which subtasks are attempted. If true, the easiest takes
      * are attempted first. If false, harder tasks are attempted first.
      * @type boolean
      * @public
      */
    this.easiestFirst = true
  }
}

export default OrTask
