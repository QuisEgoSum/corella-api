import {BaseService} from '@core/service'
import {IOrder} from '@app/project/packages/task/packages/status/packages/order/OrderModel'
import {OrderRepository} from '@app/project/packages/task/packages/status/packages/order/OrderRepository'


export class OrderService extends BaseService<IOrder, OrderRepository> {
  constructor(repository: OrderRepository) {
    super(repository)
  }
}