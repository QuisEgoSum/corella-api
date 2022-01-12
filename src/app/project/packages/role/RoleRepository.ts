import {BaseRepository} from 'core/repository'
import {IRole, RoleModel} from './RoleModel'


export class RoleRepository extends BaseRepository<IRole> {
  constructor(Model: typeof RoleModel) {
    super(Model)
  }
}