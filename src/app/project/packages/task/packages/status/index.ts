import {StatusModel} from './StatusModel'
import {StatusRepository} from './StatusRepository'
import {StatusService} from './StatusService'
import {FastifyInstance} from 'fastify'
import {routes} from './router'
import {initOrder, Order} from '@app/project/packages/task/packages/status/packages/order'
import {initModifier, Modifier} from '@app/project/packages/task/packages/status/packages/modifier'
import * as schemas from './schemas'


class Status {
  public readonly service: StatusService
  public readonly order: Order
  public readonly modifier: Modifier
  constructor(
    service: StatusService,
    order: Order,
    modifier: Modifier
  ) {
    this.service = service
    this.order = order
    this.modifier = modifier
  }

  async router(fastify: FastifyInstance) {
    return await routes(fastify, this.service)
  }
}


export async function initStatus(): Promise<Status> {
  const order = await initOrder()
  const modifier = await initModifier()

  const service = new StatusService(new StatusRepository(StatusModel), order.service, modifier.service)

  return new Status(service, order, modifier)
}

export {
  schemas
}

export type {
  Status
}
