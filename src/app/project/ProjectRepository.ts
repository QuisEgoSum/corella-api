import {BaseRepository} from 'core/repository'
import type {ProjectModel} from './ProjectModel'
import {IProject} from './ProjectModel'
import {Types} from 'mongoose'
import {PageOptions} from 'core/repository/IBaseRepository'
import {DataList} from 'common/data'
import {ExpandProjectPreview} from './schemas/entities'


export class ProjectRepository extends BaseRepository<IProject> {
  constructor(Model: typeof ProjectModel) {
    super(Model)
  }

  async findUserProjects(userId: Types.ObjectId, query: PageOptions): Promise<DataList<ExpandProjectPreview>> {
    const dataPromise = this.Model
      .aggregate(
        [
          {
            $match: {
              members: userId
            }
          },
          {
            $skip: (query.page - 1) * query.limit
          },
          {
            $limit: query.limit
          },
          {
            $lookup: {
              from: 'project_members',
              let: {
                projectId: '$_id',
                userId: userId
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {$eq: ['$projectId', '$$projectId']},
                        {$eq: ['$userId', '$$userId']}
                      ]
                    }
                  }
                },
                // {
                //   $lookup: {
                //     from: 'project_member_invitations',
                //     let: {
                //       projectId: '$projectId',
                //       userId: '$userId'
                //     },
                //     pipeline: [
                //       {
                //         $match: {
                //           $expr: {
                //             $and: [
                //               {$eq: ['$projectId', '$$projectId']},
                //               {$eq: ['$userId', '$$userId']},
                //               {$eq: ['$status', 'NEW']}
                //             ]
                //           }
                //         }
                //       },
                //       {
                //         $project: {
                //           status: 1,
                //           createdAt: 1
                //         }
                //       }
                //     ],
                //     as: 'invitations'
                //   }
                // }
              ],
              as: 'member'
            }
          },
          {
            $unwind: '$member'
          },

          {
            $lookup: {
              from: 'project_roles',
              localField: 'member.roleId',
              foreignField: '_id',
              as: 'member.role'
            }
          },
          {
            $unwind: '$member.role'
          },
          {
            $project: {
              name: 1,
              description: 1,
              'member._id': 1,
              'member.status': 1,
              'member.role._id': 1,
              'member.role.name': 1,
              // 'member.invite': {
              //   $first: '$member.invitations'
              // },
              'member.createdAt': 1,
              createdAt: 1
            }
          }
        ]
      )
      .exec()

    const [data, total] = await Promise.all([
      dataPromise,
      this.count(
        {
          members: userId
        }
      )
    ])

    return new DataList<ExpandProjectPreview>(total, Math.ceil(total / query.limit), data)
  }

  pullMemberId(projectId: Types.ObjectId | string, userId: Types.ObjectId | string) {
    return this.updateById(new Types.ObjectId(projectId), {
        $pull: {
          members: new Types.ObjectId(userId)
        }
      })
  }

  pushMemberId(projectId: Types.ObjectId, userId: Types.ObjectId) {
    return this.updateById(projectId, {
      $addToSet: {
        members: userId
      }
    })
  }
}