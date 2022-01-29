import {BaseService} from 'core/service'
import {IInvite} from './InviteModel'
import {InviteRepository} from './InviteRepository'
import {Types} from 'mongoose'
import {RoleService} from 'app/project/packages/role/RoleService'
import {
  InviteAcceptedError,
  InviteCancelledError,
  InviteDeclinedError,
  InviteNotExistsError,
  SomeoneElseInvitationError, SomeoneElseProjectInvitationError,
  UnknownFailedAcceptInviteError, UnknownFailedCancelInviteError
} from './invite-error'
import {InviteStatus} from './InviteStatus'
import {PageOptions} from '../../../../../../core/repository/IBaseRepository'


export class InviteService extends BaseService<IInvite, InviteRepository> {
  private roleService: RoleService

  constructor(
    inviteRepository: InviteRepository,
    roleService: RoleService,
  ) {
    super(inviteRepository)

    this.roleService = roleService

    this.Error.EntityNotExistsError = InviteNotExistsError
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

  async acceptInvite(inviteId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<IInvite> {
    let invite = await this.repository.acceptInvite(inviteId, userId)
    if (invite !== null) {
      return invite
    }
    invite = await this.findById(inviteId)
    if (invite.userId.toHexString() !== String(userId)) {
      throw new SomeoneElseInvitationError()
    } else if (invite.status === InviteStatus.ACCEPTED) {
      throw new InviteAcceptedError()
    } else if (invite.status === InviteStatus.DECLINED) {
      throw new InviteDeclinedError()
    } else if (invite.status === InviteStatus.CANCELLED) {
      throw new InviteCancelledError()
    } else {
      throw new UnknownFailedAcceptInviteError()
    }
  }

  async cancelInvite(projectId: Types.ObjectId | string, inviteId: Types.ObjectId | string): Promise<IInvite> {
    let invite = await this.repository.cancelInvite(projectId, inviteId)
    if (invite !== null) {
      return invite
    }
    invite = await this.findById(inviteId)
    if (invite.projectId.toHexString() !== String(projectId)) {
      throw new SomeoneElseProjectInvitationError()
    } else if (invite.status === InviteStatus.CANCELLED) {
      throw new InviteCancelledError()
    } else if (invite.status === InviteStatus.DECLINED) {
      throw new InviteDeclinedError()
    } else if (invite.status === InviteStatus.ACCEPTED) {
      throw new InviteAcceptedError()
    } else {
      throw new UnknownFailedCancelInviteError()
    }
  }

  async findProjectsByUserInvites(userId: Types.ObjectId | string, page: PageOptions) {
    return this.repository.findProjectsByUserInvites(userId, page)
  }
}