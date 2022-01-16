import {BaseService} from 'core/service'
import {IInvite} from './InviteModel'
import {InviteRepository} from './InviteRepository'
import {Types} from 'mongoose'
import {RoleService} from 'app/project/packages/role/RoleService'
import {User as UserPkg} from 'app/user'


export class InviteService extends BaseService<IInvite, InviteRepository> {
  private roleService: RoleService

  constructor(
    inviteRepository: InviteRepository,
    roleService: RoleService,
  ) {
    super(inviteRepository)

    this.roleService = roleService
  }

  async createInvite(projectId: Types.ObjectId | string, userId: Types.ObjectId | string, roleId?: Types.ObjectId | string) {
    if (roleId) {
      await this.roleService.existsRole(projectId, roleId)
    }

    const invite = await this.create(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId),
        roleId: roleId ? new Types.ObjectId(roleId) : null
      }
    )

    return invite
  }
}