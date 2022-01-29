import {BaseService} from 'core/service'
import {IRole} from './RoleModel'
import {RoleRepository} from './RoleRepository'
import {Types} from 'mongoose'
import {RolePermission} from './RolePermission'
import {CreateRole, UpdateRole} from './schemas/entities'
import {
  DefaultProjectRoleNotExists,
  RoleNotExistsError,
  UnableDeleteRoleError,
  UnableUpdateRoleError
} from './role-error'
import {PageOptions} from 'core/repository/IBaseRepository'
import {RoleEvents} from './RoleEvents'


export class RoleService extends BaseService<IRole, RoleRepository> {
  private events: RoleEvents
  constructor(roleRepository: RoleRepository, roleEvents: RoleEvents) {
    super(roleRepository)

    this.events = roleEvents

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

  async updateRole(projectId: Types.ObjectId | string, roleId: Types.ObjectId | string, updateRole: UpdateRole) {
    const updatedRole = await this.repository.updateRole(projectId, roleId, updateRole)
    if (updatedRole !== null) {
      return updatedRole
    }
    await this.existsRole(projectId, roleId)
    throw new UnableUpdateRoleError()
  }

  async deleteRole(projectId: Types.ObjectId | string, roleId: Types.ObjectId | string) {
    const deletedRole = await this.repository.deleteRole(projectId, roleId)
    if (deletedRole !== null) {
      try {
        const defaultRoleId = await this.findGuestId(projectId)
        this.events.emit('DELETE_ROLE', projectId, roleId, defaultRoleId)
      } catch (error) {
        if (error instanceof this.Error.EntityNotExistsError) {
          throw new DefaultProjectRoleNotExists()
        } else {
          throw error
        }
      }
      return deletedRole
    }
    await this.existsRole(projectId, roleId)
    throw new UnableDeleteRoleError()
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

  async findRoles(projectId: string, query: PageOptions) {
    return this.repository.findRoles(projectId, query)
  }

  private async findGuestId(projectId: Types.ObjectId | string): Promise<Types.ObjectId> {
    const defaultRole = await this.repository.findGuestId(projectId)
    if (defaultRole == null) {
      throw new this.Error.EntityNotExistsError()
    }
    return defaultRole._id
  }
}