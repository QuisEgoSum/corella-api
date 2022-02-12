import {BaseService} from 'core/service'
import {IMember} from './MemberModel'
import {MemberRepository} from './MemberRepository'
import {Types} from 'mongoose'
import {
  BlockingNonParticipantError,
  FailedAcceptInviteError,
  MemberExistsError,
  MemberNotExistsError
} from './member-error'
import {InviteService} from './packages/invite/InviteService'
import {MemberStatus} from './MemberStatus'
import {RoleService} from '../role/RoleService'
import {User as UserPkg} from 'app/user'
import {MemberEvents} from './MemberEvents'
import {PageOptions} from 'core/repository/IBaseRepository'
import {DataList} from 'common/data'
import {MemberDto} from './member-dto'


export class MemberService extends BaseService<IMember, MemberRepository> {
  private readonly inviteService: InviteService
  private readonly roleService: RoleService
  private readonly User: UserPkg
  private readonly events: MemberEvents

  constructor(
    memberRepository: MemberRepository,
    memberEvents: MemberEvents,
    inviteService: InviteService,
    roleService: RoleService,
    User: UserPkg
  ) {
    super(memberRepository)

    this.Error.EntityExistsError = MemberExistsError
    this.Error.EntityNotExistsError = MemberNotExistsError
  
    this.events = memberEvents
    this.inviteService = inviteService
    this.roleService = roleService
    this.User = User
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

  async inviteMember(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ): Promise<MemberDto> {
    await this.User.existsUser(userId)
    await this.roleService.existsRole(projectId, roleId)

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

    await this.inviteService.createInvite(projectId, userId)

    const member = await this.repository.upsertMember(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId),
        status: MemberStatus.INVITED
      }
    )

    return new MemberDto(member)
  }

  async acceptInvite(inviteId: Types.ObjectId | string, userId: Types.ObjectId | string) {
    const invite = await this.inviteService.acceptInvite(inviteId, userId)
    const result = await this.repository.changeMemberStatus(invite.projectId, invite.userId, MemberStatus.PARTICIPANT)
    if (!result.modifiedCount) {
      throw new FailedAcceptInviteError()
    }
    this.events.emit('ACCEPT_INVITE', invite.projectId, invite.userId)
  }

  async cancelInvite(projectId: Types.ObjectId | string, inviteId: Types.ObjectId | string) {
    const invite = await this.inviteService.cancelInvite(projectId, inviteId)
    await this.repository.changeMemberStatus(invite.projectId, invite.userId, MemberStatus.BLOCKED)
    this.events.emit('CANCEL_INVITE', invite.projectId, invite.userId)
  }

  async findProjectsByUserInvites(userId: Types.ObjectId | string, page: PageOptions) {
    return this.inviteService.findProjectsByUserInvites(userId, page)
  }

  async findProjectMembers(projectId: string | Types.ObjectId, query: PageOptions): Promise<DataList<MemberDto>> {
    const list = await this.repository.findProjectMembers(new Types.ObjectId(projectId), query)
    const members = list.data.map(member => new MemberDto(member))
    return new DataList(list.total, list.pages, members)
  }

  async changeMembersRoleFrom(projectId: Types.ObjectId | string, fromRoleId: Types.ObjectId | string, toRoleId: Types.ObjectId | string) {
    await this.repository.changeMembersRoleFrom(projectId, fromRoleId, toRoleId)
    //TODO: Change invite role if invite status NEW
  }

  async rejectInvite(inviteId: string, userId: string | Types.ObjectId) {
    const invite = await this.inviteService.rejectInvite(inviteId, userId)
    await this.repository.changeMemberStatus(invite.projectId, userId, MemberStatus.REJECTED)
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
    // const member = await this.repository.updateMemberRole(projectId, memberId, roleId)
    // if (member === null) {
    //   throw new this.Error.EntityNotExistsError()
    // }

  }
}