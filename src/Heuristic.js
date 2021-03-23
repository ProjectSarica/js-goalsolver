/**
 * An estimate for the cost of completing a task.
 * @public
 */
class Heuristic {
  /**
   * Creates an empty heuristic instance.
   * @param {Handler} handler - The handler who created this estimate.
   */
  constructor (handler) {
    /**
     * The estimated cost value. Defaults to 0.
     * @type number
     * @public
     */
    this.value = 0

    /**
     * The estimated probability that the given task will succeed. (From 0 to 1)
     * @type {number}
     * @public
     */
    this.successProbability = 1.0

    /**
     * The estimated child tasks that need to be executed in order
     * to complete this task.
     * @type Task[]
     * @public
     */
    this.childTasks = []

    /**
     * The handler who created this estimate.
     * @type Handler
     * @public
     * @readonly
     */
    this.handler = handler

    /**
     * The full cost of this heuristic, accounting for the cost of all
     * child tasks, recursively. Value defaults to null. This value is
     * scaled based on success probability.
     * @type {number|null}
     * @public
     */
    this.fullCost = null
  }
}

export default Heuristic
