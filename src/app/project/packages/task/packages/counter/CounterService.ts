import {BaseService} from '@core/service'
import {ICounter} from './CounterModel'
import {CounterRepository} from './CounterRepository'
import {Types} from 'mongoose'


export class CounterService extends BaseService<ICounter, CounterRepository> {
  constructor(counterRepository: CounterRepository) {
    super(counterRepository)
  }

  async createCounter(projectId: Types.ObjectId | string, initial = 0) {
    await this.create(
      {
        projectId: new Types.ObjectId(projectId),
        count: initial
      }
    )
  }

  async inc(projectId: Types.ObjectId | string) {
    const number = await this.repository.inc(projectId)

    if (number === null) {
      await this.createCounter(projectId, 1)
      return 1
    }

    return number
  }
}