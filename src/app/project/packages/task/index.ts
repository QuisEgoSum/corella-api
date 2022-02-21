import {TaskModel} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'
import {TaskService} from '@app/project/packages/task/TaskService'
import {initCounter, Counter} from './packages/counter'


export class Task {
  public readonly service: TaskService
  public readonly counter: Counter

  constructor(
    service: TaskService,
    counter: Counter
  ) {
    this.service = service
    this.counter = counter
  }
}


export async function initTask() {
  const counter = await initCounter()

  const service = new TaskService(new TaskRepository(TaskModel))

  return new Task(service, counter)
}