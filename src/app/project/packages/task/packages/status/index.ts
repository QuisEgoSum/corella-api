import {StatusModel} from './StatusModel'
import {StatusRepository} from './StatusRepository'
import {StatusService} from './StatusService'
import {FastifyInstance} from 'fastify'
import {routes} from './router'


class Status {
  private readonly service: StatusService
  constructor(
    service: StatusService
  ) {
    this.service = service
  }

  async router(fastify: FastifyInstance) {
    return await routes(fastify, this.service)
  }
}


export async function initStatus(): Promise<Status> {
  const service = new StatusService(new StatusRepository(StatusModel))

  return new Status(service)
}


export type {
  Status
}
