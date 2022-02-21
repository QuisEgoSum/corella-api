import {StatusModel} from './StatusModel'
import {StatusRepository} from './StatusRepository'
import {StatusService} from './StatusService'
import {FastifyInstance} from 'fastify'


class Status {
  private service: StatusService
  constructor(
    service: StatusService
  ) {
    this.service = service
  }

  router(fastify: FastifyInstance) {

  }
}


export async function initStatus(): Promise<Status> {
  const service = new StatusService(new StatusRepository(StatusModel))

  return new Status(service)
}


export type {
  Status
}
