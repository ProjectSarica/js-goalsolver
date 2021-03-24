import Heuristic from '../Heuristic'
import Handler from '../Handler'

/**
 * A basic handler for executing "not" tasks.
 */
class NotTaskHandler extends Handler {
  /**
   * Creates a new Not task handler.
   */
  constructor (goalSolver) {
    super('not')

    /**
     * An instance of the goal solver being used for this handler.
     * @type GoalSolver
     * @private
     * @readonly
     */
    this.goalSolver = goalSolver
  }

  /** @inheritdoc */
  async getHeuristic (task) {
    if (task.taskType !== this.taskType) return null

    const heuristic = new Heuristic(this)
    heuristic.childTasks.push(task.subtask)

    return heuristic
  }

  /** @inheritdoc */
  async execute (task) {
    try {
      await this.goalSolver.execute(task.subtask)
    } catch (err) {
      return
    }

    throw new Error('Expected subtask to fail, but it succeeded!')
  }
}

export default NotTaskHandler
