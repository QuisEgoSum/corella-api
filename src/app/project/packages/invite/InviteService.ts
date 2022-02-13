import {BaseService} from '@core/service'
import {IInvite} from './InviteModel'
import {InviteRepository} from './InviteRepository'
import {Types} from 'mongoose'
import {
  InviteAcceptedError,
  InviteCancelledError,
  InviteNotExistsError,
  InviteRejectedError,
  SomeoneElseInvitationError,
  SomeoneElseProjectInvitationError,
  UnknownFailedAcceptInviteError,
  UnknownFailedCancelInviteError,
  UnknownFailedRejectInviteError
} from './invite-error'
import {InviteStatus} from './InviteStatus'
import type {PageOptions} from '@core/repository/IBaseRepository'
import type {BaseError} from 'openapi-error'
import type {MemberService} from '@app/project/packages/member/MemberService'
import type {RoleService} from '@app/project/packages/role/RoleService'
import type {User} from '@app/user'


export class InviteService extends BaseService<IInvite, InviteRepository> {
  private memberService: MemberService
  private userApp: User
  private roleService: RoleService

  constructor(
    inviteRepository: InviteRepository,
    userApp: User,
    memberService: MemberService,
    roleService: RoleService
  ) {
    super(inviteRepository)

    this.memberService = memberService
    this.userApp = userApp
    this.roleService = roleService

    this.Error.EntityNotExistsError = InviteNotExistsError
  }

  async createInvite(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ) {
    await this.userApp.existsUser(userId)
    await this.roleService.existsRole(projectId, roleId)
    await this.memberService.allowedInvite(projectId, userId)
    await this.create({projectId: new Types.ObjectId(projectId), userId: new Types.ObjectId(userId)})
    return await this.memberService.upsertInvitedMember(projectId, userId, roleId)
  }

  private static getInviteStatusError(invite: IInvite, DefaultError: typeof BaseError) {
    switch (invite.status) {
      case InviteStatus.ACCEPTED:
        return new InviteAcceptedError()
      case InviteStatus.REJECTED:
        return new InviteRejectedError()
      case InviteStatus.CANCELLED:
        return new InviteCancelledError()
      default:
        return new DefaultError()
    }
  }

  async acceptInvite(inviteId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<void> {
    let invite = await this.repository.acceptInvite(inviteId, userId)
    if (invite !== null) {
      return await this.memberService.acceptInvite(invite)
    }
    invite = await this.findById(inviteId)
    if (invite.userId.toHexString() !== String(userId)) {
      throw new SomeoneElseInvitationError()
    }
    throw InviteService.getInviteStatusError(invite, UnknownFailedAcceptInviteError)
  }

  async cancelInvite(projectId: Types.ObjectId | string, inviteId: Types.ObjectId | string): Promise<IInvite> {
    let invite = await this.repository.cancelInvite(projectId, inviteId)
    if (invite !== null) {
      await this.memberService.cancelInvite(invite)
      return invite
    }
    invite = await this.findById(inviteId)
    if (invite.projectId.toHexString() !== String(projectId)) {
      throw new SomeoneElseProjectInvitationError()
    }
    throw InviteService.getInviteStatusError(invite, UnknownFailedCancelInviteError)
  }

  async findProjectsByUserInvites(userId: Types.ObjectId | string, page: PageOptions) {
    return this.repository.findProjectsByUserInvites(userId, page)
  }

  async rejectInvite(inviteId: string, userId: string | Types.ObjectId) {
    let invite = await this.repository.rejectInvite(inviteId, userId)
    if (invite !== null) {
      await this.memberService.rejectInvite(invite)
      return invite
    }
    invite = await this.findById(inviteId)
    if (invite.userId.toHexString() !== String(userId)) {
      throw new SomeoneElseInvitationError({message: 'You can\'t reject someone else\'s invitation'})
    }
    throw InviteService.getInviteStatusError(invite, UnknownFailedRejectInviteError)
  }
}