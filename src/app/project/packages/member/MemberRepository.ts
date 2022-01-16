import {BaseRepository} from 'core/repository'
import {IMember, MemberModel} from './MemberModel'
import {Types} from 'mongoose'
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
  constructor(Model: typeof MemberModel) {
    super(Model)
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
          populate: [
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
          ],
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
        populate: [
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
        ],
        sort: {
          createdAt: 1
        }
      }
    ) as unknown as Promise<DataList<PopulatedMember>>
  }
}
