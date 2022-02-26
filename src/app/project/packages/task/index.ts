import {TaskModel} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'
import {TaskService} from '@app/project/packages/task/TaskService'
import {initCounter, Counter} from './packages/counter'
import {initStatus, Status} from '@app/project/packages/task/packages/status'
import {FastifyInstance} from 'fastify'
import {routes} from '@app/project/packages/task/routes'


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
  const counter = await initCounter()
  const status = await initStatus()

  const service = new TaskService(new TaskRepository(TaskModel), status.service, counter.service)

  return new Task(service, counter, status)
}