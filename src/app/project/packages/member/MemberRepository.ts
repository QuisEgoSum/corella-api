import {BaseRepository} from 'core/repository'
import {IMember, MemberModel} from './MemberModel'
import {Types} from 'mongoose'
import {MemberStatus} from './MemberStatus'


export class MemberRepository extends BaseRepository<IMember> {
  constructor(Model: typeof MemberModel) {
    super(Model)
  }

  async upsertMember(member: {roleId: Types.ObjectId, projectId: Types.ObjectId, userId: Types.ObjectId, status: MemberStatus}): Promise<IMember> {
    return this.Model
      .findOneAndUpdate(
        {
          projectId: member.projectId,
          userId: member.userId
        },
        {
          $setOnInsert: {
            projectId: member.projectId,
            userId: member.userId
          },
          $set: {
            roleId: member.roleId,
            status: member.status
          }
        },
        {
          upsert: true,
          new: true
        }
      )
  }
}
