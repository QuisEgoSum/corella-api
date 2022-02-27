import {BaseService} from '@core/service'
import {IModifier, StatusModifier} from '@app/project/packages/task/packages/status/packages/modifier/ModifierModel'
import {ModifierRepository} from '@app/project/packages/task/packages/status/packages/modifier/ModifierRepository'
import {Types} from 'mongoose'
import {
  DefaultStatusNotExistError,
  ProjectModifierOptionsNotExistsError
} from '@app/project/packages/task/packages/status/packages/modifier/modifier-error'


export class ModifierService extends BaseService<IModifier, ModifierRepository> {
  constructor(repository: ModifierRepository) {
    super(repository)
  }

  async findDefaultStatusId(projectObjectId: Types.ObjectId): Promise<Types.ObjectId> {
    const modifier = await this.repository.findByModifier(projectObjectId, StatusModifier.DEFAULT)
    if (!modifier) {
      throw new ProjectModifierOptionsNotExistsError()
    }
    const modifierId = modifier.statuses[0]?._id

    if (!modifierId) {
      throw new DefaultStatusNotExistError()
    }

    return modifierId
  }
}