import {BaseService} from '@core/service'
import {IModifier} from '@app/project/packages/task/packages/status/packages/modifier/ModifierModel'
import {ModifierRepository} from '@app/project/packages/task/packages/status/packages/modifier/ModifierRepository'


export class ModifierService extends BaseService<IModifier, ModifierRepository> {
  constructor(repository: ModifierRepository) {
    super(repository)
  }
}