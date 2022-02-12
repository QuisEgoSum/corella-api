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
import {PageOptions} from '@core/repository/IBaseRepository'
import {BaseError} from 'openapi-error'


export class InviteService extends BaseService<IInvite, InviteRepository> {
  constructor(
    inviteRepository: InviteRepository
  ) {
    super(inviteRepository)

    this.Error.EntityNotExistsError = InviteNotExistsError
  }

  async createInvite(projectId: Types.ObjectId | string, userId: Types.ObjectId | string) {
    return await this.create(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId)
      }
    )
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

  async acceptInvite(inviteId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<IInvite> {
    let invite = await this.repository.acceptInvite(inviteId, userId)
    if (invite !== null) {
      return invite
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
      return invite
    }
    invite = await this.findById(inviteId)
    if (invite.userId.toHexString() !== String(userId)) {
      throw new SomeoneElseInvitationError({message: 'You can\'t reject someone else\'s invitation'})
    }
    throw InviteService.getInviteStatusError(invite, UnknownFailedRejectInviteError)
  }
}