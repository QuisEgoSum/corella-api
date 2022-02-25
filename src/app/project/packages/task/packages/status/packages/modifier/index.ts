import {ModifierService} from '@app/project/packages/task/packages/status/packages/modifier/ModifierService'
import {ModifierRepository} from '@app/project/packages/task/packages/status/packages/modifier/ModifierRepository'
import {ModifierModel, StatusModifier} from '@app/project/packages/task/packages/status/packages/modifier/ModifierModel'


class Modifier {
  public readonly service: ModifierService
  constructor(
    service: ModifierService
  ) {
    this.service = service
  }
}


export async function initModifier(): Promise<Modifier> {
  return new Modifier(new ModifierService(new ModifierRepository(ModifierModel)))
}


export {
  StatusModifier
}


export type {
  Modifier
}