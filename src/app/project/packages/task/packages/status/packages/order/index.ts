import {OrderService} from '@app/project/packages/task/packages/status/packages/order/OrderService'
import {OrderModel} from '@app/project/packages/task/packages/status/packages/order/OrderModel'
import {OrderRepository} from '@app/project/packages/task/packages/status/packages/order/OrderRepository'


class Order {
  public readonly service: OrderService
  constructor(
    service: OrderService
  ) {
    this.service = service
  }
}


export async function initOrder(): Promise<Order> {
  return new Order(new OrderService(new OrderRepository(OrderModel)))
}

export type {
  Order
}