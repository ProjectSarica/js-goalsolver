
## Classes

Name | Description
------ | -----------
[GoalSolver] | A solver to calculating the best approach to executing the given task, if possible.
*[Handler]* | An abstract handler class for handling a task.
[Heuristic] | An estimate for the cost of completing a task.
[InvalidTaskTypeError] | An error that is thrown when the given task type is not valid.
[Task] | A definition for a task to be completed.


## GoalSolver

A solver to calculating the best approach to executing the given task, if possible.

**Kind**: global class  

* [GoalSolver]
    * [new GoalSolver()]
    * [.addHandler(handler)]
    * [.removeHandler(handler)]
    * [.getFullCost(heuristic, depth)]
    * [.getHeuristic(task, depth)]
    * [.execute(task, searchDepth)]


### new GoalSolver()

Creates a new GoalSolver instance.


### goalSolver.addHandler(handler)

Adds a new handler to this solver.

**Kind**: instance method of [`GoalSolver`]  

| Param | Type | Description |
| --- | --- | --- |
| handler | [`Handler`] | The handler to add. |


### goalSolver.removeHandler(handler)

Removes a handler from this solver.

**Kind**: instance method of [`GoalSolver`]  

| Param | Type | Description |
| --- | --- | --- |
| handler | [`Handler`] | The handler to remove. |


### goalSolver.getFullCost(heuristic, depth)

Estimates the total cost of the heuristic accounting for all child tasks
recursively and success probabilities.

**Kind**: instance method of [`GoalSolver`]  
**Returns**: `number` - The full cost of the heuristic.  

| Param | Type | Description |
| --- | --- | --- |
| heuristic | [`Heuristic`] | The heuristic to get the full cost of. |
| depth | `number` | The maximum recursion depth. |


### goalSolver.getHeuristic(task, depth)

Calculates the heuristic estimate for completing the given task.

**Kind**: instance method of [`GoalSolver`]  
**Returns**: [`Heuristic`] ⎮ `null` - The heuristic for the task, or null if the
task is not completable.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| task | [`Task`] |  | The task to get the heuristic for. |
| depth | `number` | `1` | The maximum search depth. Defaults to 1. |


### goalSolver.execute(task, searchDepth)

Executes the given task.

**Kind**: instance method of [`GoalSolver`]  

| Param | Type | Description |
| --- | --- | --- |
| task | [`Task`] | The task to execute. |
| searchDepth | `*` | The maximum search depth then choosing task handlers. |


## *Handler*

An abstract handler class for handling a task.

**Kind**: global abstract class  
**Access**: public  

* *[Handler]*
    * *[new Handler(taskType)]*
    * *[.taskType]*
    * **[.getHeuristic(task)]**
    * **[.execute(task)]**


### *new Handler(taskType)*

Creates a new handler instance.


| Param | Type | Description |
| --- | --- | --- |
| taskType | `string` | The type of task this handler can execute. |


### *handler.taskType*

The type of task this handler can execute.

**Kind**: instance property of [`Handler`]  
**Access**: public  
**Read only**: true  

### **handler.getHeuristic(task)**

Gets a heuristic estimate for the cost of completing the given task.

**Kind**: instance abstract method of [`Handler`]  
**Returns**: [`Heuristic`] ⎮ `null` - The heuristic estimate, or null if the task cannot be completed.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| task | [`Task`] | The task to estimate for. |


### **handler.execute(task)**

Executes the given task.

**Kind**: instance abstract method of [`Handler`]  
**Throws**:

- `InvalidTaskType` If task type does not match handler task type.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| task | [`Task`] | The task to execute. |


## Heuristic

An estimate for the cost of completing a task.

**Kind**: global class  
**Access**: public  

* [Heuristic]
    * [new Heuristic(handler)]
    * [.value]
    * [.successProbability]
    * [.childTasks]
    * [.handler]
    * [.fullCost]


### new Heuristic(handler)

Creates an empty heuristic instance.


| Param | Type | Description |
| --- | --- | --- |
| handler | [`Handler`] | The handler who created this estimate. |


### heuristic.value

The estimated cost value. Defaults to 0.

**Kind**: instance property of [`Heuristic`]  
**Access**: public  

### heuristic.successProbability

The estimated probability that the given task will succeed. (From 0 to 1)

**Kind**: instance property of [`Heuristic`]  
**Access**: public  

### heuristic.childTasks

The estimated child tasks that need to be executed in order
to complete this task.

**Kind**: instance property of [`Heuristic`]  
**Access**: public  

### heuristic.handler

The handler who created this estimate.

**Kind**: instance property of [`Heuristic`]  
**Access**: public  
**Read only**: true  

### heuristic.fullCost

The full cost of this heuristic, accounting for the cost of all
child tasks, recursively. Value defaults to null. This value is
scaled based on success probability.

**Kind**: instance property of [`Heuristic`]  
**Access**: public  

## InvalidTaskTypeError

An error that is thrown when the given task type is not valid.

**Kind**: global class  

### new InvalidTaskTypeError(taskType, expected)

Creates a new Invalid Task Type error.


| Param | Type | Description |
| --- | --- | --- |
| taskType | `string` | The given task type. |
| expected | `string` | The expected task type. |


## Task

A definition for a task to be completed.

**Kind**: global class  
**Access**: public  

* [Task]
    * [new Task(taskType)]
    * [.taskType]


### new Task(taskType)

Creates a new task instance.


| Param | Type | Description |
| --- | --- | --- |
| taskType | `string` | The type of task to be completed. |


### task.taskType

The type of task.

**Kind**: instance property of [`Task`]  
**Access**: public  
**Read only**: true  
<!-- LINKS -->

[GoalSolver]:#goalsolver
[Handler]:#handler
[Heuristic]:#heuristic
[InvalidTaskTypeError]:#invalidtasktypeerror
[Task]:#task
[`GoalSolver`]:#new-goalsolver
[`Handler`]:#new-handlertasktype
[`Heuristic`]:#new-heuristichandler
[`Task`]:#new-tasktasktype
[.taskType]:#tasktasktype
[.value]:#heuristicvalue
[.successProbability]:#heuristicsuccessprobability
[.childTasks]:#heuristicchildtasks
[.handler]:#heuristichandler
[.fullCost]:#heuristicfullcost
[new GoalSolver()]:#new-goalsolver
[.addHandler(handler)]:#goalsolveraddhandlerhandler
[.removeHandler(handler)]:#goalsolverremovehandlerhandler
[.getFullCost(heuristic, depth)]:#goalsolvergetfullcostheuristic-depth
[.getHeuristic(task, depth)]:#goalsolvergetheuristictask-depth
[.execute(task, searchDepth)]:#goalsolverexecutetask-searchdepth
[new Handler(taskType)]:#new-handlertasktype
[.getHeuristic(task)]:#handlergetheuristictask
[.execute(task)]:#handlerexecutetask
[new Heuristic(handler)]:#new-heuristichandler
[new Task(taskType)]:#new-tasktasktype
