import {BaseService} from 'core/service'
import {IRole} from './RoleModel'
import {RoleRepository} from './RoleRepository'
import {Types} from 'mongoose'
import {RolePermission} from './RolePermission'
import {CreateRole} from './schemas/entities'
import {RoleNotExistsError} from './role-error'


export class RoleService extends BaseService<IRole, RoleRepository> {
  constructor(roleRepository: RoleRepository) {
    super(roleRepository)

    this.Error.EntityNotExistsError = RoleNotExistsError
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
        permissions: Object.values(RolePermission) as unknown as RolePermission[],
        projectId: new Types.ObjectId(projectId),
        allowedEdit: false
      }
    )
  }

  async createGuest(projectId: Types.ObjectId | string) {
    return this.create(
      {
        name: 'Guest',
        permissions: [],
        projectId: new Types.ObjectId(projectId),
        allowedEdit: false
      }
    )
  }

  async existsRole(projectId: Types.ObjectId | string, roleId: Types.ObjectId | string) {
    await this.findOne(
      {
        _id: new Types.ObjectId(roleId),
        projectId: new Types.ObjectId(projectId)
      },
      {
        _id: 1
      }
    )
  }
}