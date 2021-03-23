/**
 * An error that is thrown when the given task type is not valid.
 */
class InvalidTaskTypeError extends Error {
  /**
   * Creates a new Invalid Task Type error.
   * @param {string} taskType - The given task type.
   * @param {string} expected - The expected task type.
   */
  constructor (taskType, expected) {
    super(`The given task type, '${taskType}' does not match the expected task type '${expected}'`)
  }
}

export default InvalidTaskTypeError
