import {TaskModel} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'
import {TaskService} from '@app/project/packages/task/TaskService'
import {initCounter, Counter} from './packages/counter'
import {initStatus, Status} from '@app/project/packages/task/packages/status'


export class Task {
  public readonly service: TaskService
  public readonly counter: Counter
  public readonly status: Status

  constructor(
    service: TaskService,
    counter: Counter,
    status: Status
  ) {
    this.service = service
    this.counter = counter
    this.status = status
  }
}


export async function initTask() {
  const counter = await initCounter()
  const status = await initStatus()

  const service = new TaskService(new TaskRepository(TaskModel))

  return new Task(service, counter, status)
}