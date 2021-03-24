import Heuristic from '../Heuristic'
import MultiSubtaskHandler from './MultiSubtaskHandler'

/**
 * A basic handler for executing "and" tasks.
 */
class AndTaskHandler extends MultiSubtaskHandler {
  /**
   * Creates a new And task handler.
   */
  constructor (goalSolver) {
    super('and', goalSolver)
  }

  /** @inheritdoc */
  async getHeuristic (task) {
    if (task.taskType !== this.taskType) return null

    const heuristic = new Heuristic(this)
    for (const subtask of task.subtasks) {
      heuristic.childTasks.push(subtask)
    }

    return heuristic
  }

  /** @inheritdoc */
  async execute (task) {
    // Make a copy of the subtask list to avoid editing the original object.
    const subtasks = [...task.subtasks]

    while (subtasks.length > 0) {
      const { next } = this.getNextSubtask(subtasks, task.searchDepth, task.easiestFirst)
      subtasks.splice(subtasks.indexOf(next), 1)

      await this.goalSolver.execute(next)
    }
  }
}

export default AndTaskHandler
