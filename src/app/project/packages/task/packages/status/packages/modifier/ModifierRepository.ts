import {BaseRepository} from '@core/repository'
import {IModifier, ModifierModel} from '@app/project/packages/task/packages/status/packages/modifier/ModifierModel'


export class ModifierRepository extends BaseRepository<IModifier> {
  constructor(Model: typeof ModifierModel) {
    super(Model)
  }
}