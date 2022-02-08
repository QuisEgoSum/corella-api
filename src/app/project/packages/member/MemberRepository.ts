import {BaseRepository} from 'core/repository'
import {IMember, MemberModel} from './MemberModel'
import {PopulateOptions, Types} from 'mongoose'
import {MemberStatus} from './MemberStatus'
import {PageOptions} from 'core/repository/IBaseRepository'
import {DataList} from 'common/data'


export interface PopulatedMember {
  _id: Types.ObjectId,
  status: MemberStatus,
  userId: {
    _id: Types.ObjectId,
    username: string,
    email: string,
    avatar: string
  },
  roleId: {
    _id: Types.ObjectId,
    name: string
  },
  createdAt: number
}


export class MemberRepository extends BaseRepository<IMember> {
  private readonly memberProjection: Record<string, any>
  private readonly memberPopulate: string | string[] | PopulateOptions | PopulateOptions[]

  constructor(Model: typeof MemberModel) {
    super(Model)

    this.memberProjection = {
      _id: 1,
      status: 1,
      userId: 1,
      roleId: 1,
      createdAt: 1
    }
    this.memberPopulate = [
      {
        model: 'User',
        path: 'userId',
        select: {
          username: 1,
          email: 1,
          avatar: 1
        }
      },
      {
        model: 'ProjectRole',
        path: 'roleId',
        select: {
          name: 1
        }
      }
    ]
  }

  async upsertMember(member: {roleId: Types.ObjectId, projectId: Types.ObjectId, userId: Types.ObjectId, status: MemberStatus}): Promise<PopulatedMember> {
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
          populate: this.memberPopulate,
          projection: this.memberProjection,
          upsert: true,
          new: true
        }
      ) as unknown as Promise<PopulatedMember>
  }

  async findProjectMembers(projectId: Types.ObjectId, query: PageOptions): Promise<DataList<PopulatedMember>> {
    return await this.findPage(
      query,
      {
        projectId: projectId
      },
      null,
      {
        populate: this.memberPopulate,
        projection: this.memberProjection,
        sort: {
          createdAt: 1
        }
      }
    ) as unknown as Promise<DataList<PopulatedMember>>
  }

  async changeMembersRoleFrom(projectId: Types.ObjectId | string, fromRoleId: Types.ObjectId | string, toRoleId: Types.ObjectId | string) {
    return this.Model
      .updateMany(
        {
          projectId: new Types.ObjectId(projectId),
          roleId: new Types.ObjectId(fromRoleId)
        },
        {
          roleId: new Types.ObjectId(toRoleId)
        }
      )
  }

  async findMemberStatusByUserId(projectId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<MemberStatus | null> {
    return this.Model
      .findOne(
        {
          projectId: new Types.ObjectId(projectId),
          userId: new Types.ObjectId(userId)
        },
        {
          status: 1
        }
      )
      .then(member => member ? member.status : null)
  }

  async changeMemberStatus(projectId: string | Types.ObjectId, userId: string | Types.ObjectId, status: MemberStatus) {
    return this.Model
      .updateOne(
        {
          projectId: new Types.ObjectId(projectId),
          userId: new Types.ObjectId(userId)
        },
        {
          status: status
        }
      )
  }
}
