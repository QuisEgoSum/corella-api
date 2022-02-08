import {BaseRepository} from 'core/repository'
import {IInvite, InviteModel} from './InviteModel'
import {Types} from 'mongoose'
import {InviteExpand} from './schemas/entities'
import {InviteStatus} from './InviteStatus'
import {PageOptions} from '../../../../../../core/repository/IBaseRepository'
import {DataList} from '../../../../../../common/data'
import {ExpandProjectPreview} from '../../../../schemas/entities'


export class InviteRepository extends BaseRepository<IInvite> {
  constructor(Model: typeof InviteModel) {
    super(Model)
  }

  async findExpandInvite(inviteId: Types.ObjectId | string): Promise<InviteExpand> {
    return this.Model
      .aggregate(
        [
          {
            $match: {_id: new Types.ObjectId(inviteId)}
          },
          {
            $lookup: {
              from: 'projects',
              localField: 'projectId',
              foreignField: '_id',
              as: 'project'
            }
          },
          {
            $unwind: '$project'
          },
          {
            $lookup: {
              from: 'project_roles',
              localField: 'roleId',
              foreignField: '_id',
              as: 'role'
            }
          },
          {
            $unwind: '$role'
          },
          {
            $project: {
              'project._id': 1,
              'project.name': 1,
              'role._id': 1,
              'role.name': 1
            }
          }
        ]
      )
      .exec()
      .then(result => result[0])
  }

  async acceptInvite(inviteId: Types.ObjectId | string, userId: Types.ObjectId | string) {
    return this.findOneAndUpdate(
      {
        _id: new Types.ObjectId(inviteId),
        userId: new Types.ObjectId(userId),
        status: InviteStatus.NEW
      },
      {
        status: InviteStatus.ACCEPTED
      },
      {
        new: true
      }
    )
  }

  async cancelInvite(projectId: Types.ObjectId | string, inviteId: Types.ObjectId | string) {
    return this.findOneAndUpdate(
        {
          _id: new Types.ObjectId(inviteId),
          projectId: new Types.ObjectId(projectId),
          status: InviteStatus.NEW
        },
        {
          status: InviteStatus.CANCELLED
        }
      )
  }

  async findProjectsByUserInvites(userId: Types.ObjectId | string, page: PageOptions) {
    const userObjectId = new Types.ObjectId(userId)

    const dataPromise = this.Model.aggregate(
      [
        {$match: {userId: userObjectId, status: InviteStatus.NEW}},
        {$sort: {createdAt: -1}},
        {$skip: (page.page - 1) * page.limit},
        {$limit: page.limit},
        {
          $lookup: {
            from: 'projects',
            localField: 'projectId',
            foreignField: '_id',
            as: 'project'
          }
        },
        {$unwind: '$project'},
        {$project: {members: 0}},
        {
          $lookup: {
            from: 'project_members',
            let: {
              projectId: '$project._id',
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
              }
            ],
            as: 'project.member'
          }
        },
        {
          $unwind: '$project.member'
        },
        {
          $lookup: {
            from: 'project_roles',
            localField: 'project.member.roleId',
            foreignField: '_id',
            as: 'project.member.role'
          }
        },
        {
          $unwind: '$project.member.role'
        },
        {
          $project: {
            status: 1,
            createdAt: 1,
            project: {
              _id: 1,
              name: 1,
              createdAt: 1,
              member: {
                _id: 1,
                createdAt: 1,
                status: 1,
                role: {
                  _id: 1,
                  name: 1,
                  createdAt: 1
                }
              }
            }
          }
        }
        // {$replaceRoot: {newRoot: '$project'}},
        // {$project: {members: 0}},
        // {
        //   $lookup: {
        //     from: 'project_members',
        //     let: {
        //       projectId: '$_id',
        //       userId: userObjectId
        //     },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $and: [
        //               {$eq: ['$projectId', '$$projectId']},
        //               {$eq: ['$userId', '$$userId']}
        //             ]
        //           }
        //         }
        //       }
        //     ],
        //     as: 'member'
        //   }
        // },
        // {
        //   $unwind: '$member'
        // },
        // {
        //   $lookup: {
        //     from: 'project_roles',
        //     localField: 'member.roleId',
        //     foreignField: '_id',
        //     as: 'member.role'
        //   }
        // },
        // {
        //   $unwind: '$member.role'
        // },
        // {
        //   $project: {
        //     name: 1,
        //     description: 1,
        //     'member._id': 1,
        //     'member.status': 1,
        //     'member.role._id': 1,
        //     'member.role.name': 1,
        //     'member.createdAt': 1,
        //     createdAt: 1
        //   }
        // }
      ]
    )

    const [data, total] = await Promise.all([
      dataPromise,
      this.count({userId: userObjectId, status: InviteStatus.NEW})
    ])

    return new DataList<ExpandProjectPreview>(total, Math.ceil(total / page.limit), data)
  }

  async rejectInvite(inviteId: string, userId: string | Types.ObjectId) {
    return this.findOneAndUpdate(
      {
        _id: new Types.ObjectId(inviteId),
        userId: new Types.ObjectId(userId),
        status: InviteStatus.NEW
      },
      {
        status: InviteStatus.REJECTED
      },
      {
        new: true
      }
    )
  }
}