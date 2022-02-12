import {BaseRepository} from '@core/repository'
import {CounterModel, ICounter} from './CounterModel'
import {Types} from 'mongoose'


export class CounterRepository extends BaseRepository<ICounter> {
  constructor(Model: typeof CounterModel) {
    super(Model)
  }

  async inc(projectId: Types.ObjectId | string): Promise<number | null> {
    return this.Model
      .findOneAndUpdate(
        {
          projectId: new Types.ObjectId(projectId)
        },
        {
          $inc: {
            count: 1
          }
        },
        {
          new: true
        }
      )
      .lean()
      .then(counter => counter?.count || null)
  }
}