import {BaseService} from 'core/service'
import {IMember} from './MemberModel'
import {MemberRepository} from './MemberRepository'
import {Types} from 'mongoose'
import {MemberExistsError, MemberNotExistsError} from './member-error'


export class MemberService extends BaseService<IMember, MemberRepository> {
  constructor(memberRepository: MemberRepository) {
    super(memberRepository)

    this.Error.EntityExistsError = MemberExistsError
    this.Error.EntityNotExistsError = MemberNotExistsError
  }
  async addMember(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ) {
    return await this.create(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId),
        roleId: new Types.ObjectId(roleId)
      }
    )
  }

  async removeMember(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string
  ) {
    await this.deleteOne(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId)
      }
    )
  }

  async changeMemberRole(
    projectId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    roleId: Types.ObjectId | string
  ) {
    return this.findOneAndUpdate(
      {
        projectId: new Types.ObjectId(projectId),
        userId: new Types.ObjectId(userId)
      },
      {
        $set: {
          roleId: new Types.ObjectId(roleId)
        }
      },
      {
        new: true
      }
    )
  }
}