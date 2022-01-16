import {BaseService} from 'core/service'
import {IMember} from './MemberModel'
import {MemberRepository} from './MemberRepository'
import {Types} from 'mongoose'
import {MemberExistsError, MemberNotExistsError} from './member-error'
import {InviteService} from './packages/invite/InviteService'
import {MemberStatus} from './MemberStatus'
import {RoleService} from '../role/RoleService'
import {User as UserPkg} from 'app/user'
import {MemberEvents} from './MemberEvents'


export class MemberService extends BaseService<IMember, MemberRepository> {
  private inviteService: InviteService
  private roleService: RoleService
  private User: UserPkg
  private events: MemberEvents

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
  ) {
    await this.User.existsUser(userId)
    await this.roleService.existsRole(projectId, roleId)

    const member = await this.repository.findOne(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId)
      },
      {
        status: 1
      }
    )

    if (member) {
      if (member.status === MemberStatus.PARTICIPANT) {
        throw new this.Error.EntityExistsError()
      } else if (member.status === MemberStatus.INVITED) {
        throw new this.Error.EntityExistsError(
          {message: 'This user has already been invited to the project'}
        )
      }
    }

    await this.inviteService.createInvite(projectId, userId, roleId)

    const addedMember = await this.repository.upsertMember(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId),
        roleId: new Types.ObjectId(roleId),
        status: MemberStatus.INVITED
      }
    )

    this.events.emit('INVITE_MEMBER', addedMember.projectId, addedMember.userId)

    return addedMember
  }

  async removeMember(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string
  ) {
    return this.findOneAndUpdate(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId)
      },
      {
        status: MemberStatus.DELETED
      },
      {
        new: true
      }
    )
  }

  async changeMemberRole(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ) {
    await this.roleService.existsRole(projectId, roleId)
    return this.findOneAndUpdate(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId)
      },
      {
        roleId: new Types.ObjectId(roleId)
      },
      {
        new: true
      }
    )
  }
}