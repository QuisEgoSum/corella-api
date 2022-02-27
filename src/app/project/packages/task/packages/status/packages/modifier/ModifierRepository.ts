import {BaseRepository} from '@core/repository'
import {
  IModifier,
  ModifierModel,
  StatusModifier
} from '@app/project/packages/task/packages/status/packages/modifier/ModifierModel'
import {Types} from 'mongoose'


export class ModifierRepository extends BaseRepository<IModifier> {
  constructor(Model: typeof ModifierModel) {
    super(Model)
  }

  async findByModifier(projectObjectId: Types.ObjectId, modifier: StatusModifier) {
    return this.findOne(
      {
        _id: projectObjectId
      },
      {
        statuses: {
          $elemMatch: {
            modifier: modifier
          }
        }
      }
    )
  }
}