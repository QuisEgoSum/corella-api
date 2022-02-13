import {BaseService} from '@core/service'
import {IMember} from './MemberModel'
import {MemberRepository} from './MemberRepository'
import {Types} from 'mongoose'
import {
  BlockingNonParticipantError,
  FailedAcceptInviteError,
  MemberExistsError,
  MemberNotExistsError
} from './member-error'
import {MemberStatus} from './MemberStatus'
import {RoleService} from '../role/RoleService'
import {MemberEvents} from './MemberEvents'
import {PageOptions} from '@core/repository/IBaseRepository'
import {DataList} from '@common/data'
import {MemberDto} from './member-dto'
import type {IInvite} from '@app/project/packages/invite/InviteModel'


export class MemberService extends BaseService<IMember, MemberRepository> {
  private readonly roleService: RoleService
  private readonly events: MemberEvents

  constructor(
    memberRepository: MemberRepository,
    memberEvents: MemberEvents,
    roleService: RoleService,
  ) {
    super(memberRepository)

    this.Error.EntityExistsError = MemberExistsError
    this.Error.EntityNotExistsError = MemberNotExistsError
  
    this.events = memberEvents
    this.roleService = roleService
  }

  async addMember(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ) {
    return this.create(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId),
        roleId: new Types.ObjectId(roleId),
        status: MemberStatus.PARTICIPANT
      }
    )
  }

  async allowedInvite(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
  ) {
    const memberStatus = await this.repository.findMemberStatusByUserId(projectId, userId)

    if (memberStatus) {
      if (memberStatus === MemberStatus.PARTICIPANT) {
        throw new this.Error.EntityExistsError()
      } else if (memberStatus === MemberStatus.INVITED) {
        throw new this.Error.EntityExistsError(
          {message: 'This user has already been invited to the project'}
        )
      }
    }
  }

  async upsertInvitedMember(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ) {
    const member = await this.repository.upsertMember(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId),
        roleId: new Types.ObjectId(roleId),
        status: MemberStatus.INVITED
      }
    )

    return new MemberDto(member)
  }

  async acceptInvite(invite: IInvite): Promise<void> {
    const result = await this.repository.changeMemberStatus(invite.projectId, invite.userId, MemberStatus.PARTICIPANT)
    if (!result.modifiedCount) {
      throw new FailedAcceptInviteError()
    }
    this.events.emit('ACCEPT_INVITE', invite.projectId, invite.userId)
  }

  async cancelInvite(invite: IInvite) {
    await this.repository.changeMemberStatus(invite.projectId, invite.userId, MemberStatus.BLOCKED)
    // this.events.emit('CANCEL_INVITE', invite.projectId, invite.userId)
  }

  async findProjectMembers(projectId: string | Types.ObjectId, query: PageOptions): Promise<DataList<MemberDto>> {
    const list = await this.repository.findProjectMembers(new Types.ObjectId(projectId), query)
    const members = list.data.map(member => new MemberDto(member))
    return new DataList(list.total, list.pages, members)
  }

  async changeMembersRoleFrom(projectId: Types.ObjectId | string, fromRoleId: Types.ObjectId | string, toRoleId: Types.ObjectId | string) {
    await this.repository.changeMembersRoleFrom(projectId, fromRoleId, toRoleId)
  }

  async rejectInvite(invite: IInvite) {
    await this.repository.changeMemberStatus(invite.projectId, invite.userId, MemberStatus.REJECTED)
  }

  async blockMember(projectId: string, memberId: string) {
    let member = await this.repository.blockMember(memberId)
    if (member) {
      this.events.emit('BLOCK_MEMBER', new Types.ObjectId(projectId), member.userId)
      return
    }
    await this.existsById(memberId)
    throw new BlockingNonParticipantError()
  }

  async changeMemberRole(projectId: string, memberId: string, roleId: string) {
    await this.roleService.existsRole(projectId, roleId)
    const result = await this.repository.updateMemberRole(projectId, memberId, roleId)
    if (!result.modifiedCount) {
      throw new this.Error.EntityNotExistsError({message: 'There was no such participant in the project'})
    }
  }

  async leave(projectId: string, userId: string | Types.ObjectId) {
    const member = await this.repository.leave(projectId, userId)
    if (member) {
      this.events.emit('LEAVE_MEMBER', member.projectId, member.userId)
      return
    }
    throw new MemberNotExistsError({message: 'There was no such participant in the project'})
  }
}