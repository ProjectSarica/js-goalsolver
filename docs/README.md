<h1 align="center">JS-GoalSolver</h1>

<p align="center">
  <img src="https://github.com/ProjectSarica/js-goalsolver/workflows/Build/badge.svg" />
  <img src="https://img.shields.io/npm/v/js-goalsolver" />
  <img src="https://img.shields.io/github/repo-size/ProjectSarica/js-goalsolver" />
  <img src="https://img.shields.io/npm/dm/js-goalsolver" />
  <img src="https://img.shields.io/github/contributors/ProjectSarica/js-goalsolver" />
  <img src="https://img.shields.io/github/license/ProjectSarica/js-goalsolver" />
</p>

## Summary

JS-GoalSolver is a JavaScript library for heuristic-based goal-solving by breaking a problem into task types, with a given list of handlers. By creating many different handlers to all execute the same tasks in different ways, the target agent can adapt to the given situation and resolve the same task differently based on it's current surroundings.

## Installation

```bash
npm install js-goalsolver
```

## Documentation

[API](./api.md)

## Example

This library can be used by defining custom task types and handlers to add to a goal solver instance. A goal solve can run and number of problems at once and stores no state about currently executing tasks. Likewise, handlers are expected not to store any state either to allow for maximum compatibility.

To define a new task type, simply create a new class that extends from the Task base class.
```js
import Task from 'js-goalsolver'

class PrintToConsoleTask extends Task {
  constructor (message) {
    // Call the super constructor with the name of the task type.
    super('print-to-console')

    // Define any additional settings you want for this task.
    this.message = message
  }
}
```

Then write one or more handlers for it. (The more handlers you have, the better. This will give the agent multiple ways to solve a problem.)
```js
import { Heuristic, Handler} from 'js-goalsolver'

class PrintToConsoleTaskHandler extends Handler {
  constructor () {
    // Call the super constructor with the task type this handler targets.
    super('print-to-console')
  }

  // Override the getHeuristic function.
  // Use this to give the solver an estimate for how costly it will be to use this
  // handler for the given task. This function does not always have to return the
  // same value and can be decided based on the state of the environment.
  async getHeuristic (task) {
    // Return null if the task cannot be completed using this approach
    if (task.taskType !== this.taskType) return null

    const heuristic = new Heuristic(this)
    heuristic.value = 1 // Add the estimated cost for completing this task
    heuristic.successProbability = 1.00 // The estimated chance of success
    heuristic.childTasks = [] // A list of child tasks that need to be executed before this task.

    return heuristic
  }

  // Override the execute function.
  // Use this to actually preform the task itself.
  // Don't worry about child tasks. All child tasks must be completed
  // before this function is called.
  async execute (task) {
    if (task.taskType !== this.taskType) {
      // Throw errors if the task fails for some reason.
      throw new Error('Wrong task type!')
    }

    console.log(task.message)
  }
}
```

Once you have your tasks set up and your handlers set up, you can pass them all to the goal solver.
```js
import { GoalSolver } from 'js-goalsolver'
import { PrintToConsoleTaskHandler} from './PrintToConsoleTaskHandler.js'
import { PrintToConsoleTask } from './PrintToConsoleTask.js'

const solver = new GoalSolver()
solver.addHandler(new PrintToConsoleTaskHandler())

solver.execute(new PrintToConsoleTask('Hello, world!'))
```

## Current Features

* Configurable depth search trees
* Probabilistic decision making
* Asynchronous processing support
* Common tasks
  * And - All subtasks must be completed to be successful.
  * Not - The subtask must fail to be successful.
  * Or - At least one subtask must be completed to be successful.

## Planned Features

* Different search strategies based on task type.
* Depth-first search.
* Breadth-first search.
* Allow heuristics to contain estimated world-states for better heuristics deeper in the tree.

## Contributing

Contributions are always welcome! Feel free to make a PR or open an issue thread for bug fixes, questions, or feature requests.