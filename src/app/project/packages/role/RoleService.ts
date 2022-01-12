import {BaseService} from 'core/service'
import {IRole} from './RoleModel'
import {RoleRepository} from './RoleRepository'
import {Types} from 'mongoose'
import {RolePermission} from './RolePermission'
import {CreateRole} from './schemas/entities'


export class RoleService extends BaseService<IRole, RoleRepository> {
  constructor(roleRepository: RoleRepository) {
    super(roleRepository)
  }

  async createRole(projectId: Types.ObjectId | string, role: CreateRole) {
    return this.create(
      {
        name: role.name,
        permissions: role.permissions,
        projectId: new Types.ObjectId(projectId),
        allowedEdit: true
      }
    )
  }

  async createMaintainer(projectId: Types.ObjectId | string) {
    return this.create(
      {
        name: 'Maintainer',
        projectId: new Types.ObjectId(projectId),
        permissions: Object.values(RolePermission) as unknown as RolePermission[],
        allowedEdit: false
      }
    )
  }
}