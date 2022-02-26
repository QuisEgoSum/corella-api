import {TaskModel} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'
import {TaskService} from '@app/project/packages/task/TaskService'
import {initCounter, Counter} from './packages/counter'
import {initStatus, Status} from '@app/project/packages/task/packages/status'
import {FastifyInstance} from 'fastify'
import {routes} from '@app/project/packages/task/routes'
import {initHistory} from '@app/project/packages/task/packages/history'


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

  async router(fastify: FastifyInstance) {
    await routes(fastify, this.service)
  }
}


export async function initTask() {
  const [counter, status, history] = await Promise.all([
    initCounter(),
    initStatus(),
    initHistory()
  ])

  const service = new TaskService(new TaskRepository(TaskModel), status.service, counter.service, history.service)

  return new Task(service, counter, status)
}