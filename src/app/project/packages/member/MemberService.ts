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
import {PageOptions} from 'core/repository/IBaseRepository'
import {BaseMember} from './schemas/entities'
import {DataList} from 'common/data'


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
  ): Promise<BaseMember> {
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

    this.events.emit('INVITE_MEMBER', new Types.ObjectId(projectId), addedMember.userId._id)

    return {
      _id: addedMember._id,
      status: addedMember.status,
      user: {
        _id: addedMember.userId._id,
        username: addedMember.userId.username,
        email: null,
        avatar: addedMember.userId.avatar
      },
      role: addedMember.roleId,
      createdAt: addedMember.createdAt
    }
  }

  // async blockMember(
  //   projectId: Types.ObjectId | string,
  //   userId: Types.ObjectId | string
  // ) {
  //   return this.findOneAndUpdate(
  //     {
  //       projectId: new Types.ObjectId(projectId),
  //       userId: new Types.ObjectId(userId)
  //     },
  //     {
  //       status: MemberStatus.BLOCKED
  //     },
  //     {
  //       new: true
  //     }
  //   )
  // }

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

  async findProjectMembers(projectId: string | Types.ObjectId, query: PageOptions): Promise<DataList<BaseMember>> {
    const list = await this.repository.findProjectMembers(new Types.ObjectId(projectId), query)

    const members = list.data
      .map(member => {
        const m: BaseMember = {
          _id: member._id,
          status: member.status,
          user: member.userId,
          role: member.roleId,
          createdAt: member.createdAt
        }
        if (member.status !== MemberStatus.PARTICIPANT) {
          m.user.email = null
        }
        return m
      })

    return new DataList(list.total, list.pages, members)
  }
}