import {BaseRepository} from '@core/repository'
import {IOrder, OrderModel} from '@app/project/packages/task/packages/status/packages/order/OrderModel'


export class OrderRepository extends BaseRepository<IOrder> {
  constructor(Model: typeof OrderModel) {
    super(Model)
  }
}