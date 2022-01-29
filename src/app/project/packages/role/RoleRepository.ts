import {BaseRepository} from 'core/repository'
import {IRole, RoleModel} from './RoleModel'
import {PageOptions} from 'core/repository/IBaseRepository'
import {Types} from 'mongoose'
import {UpdateRole} from './schemas/entities'


export class RoleRepository extends BaseRepository<IRole> {
  private readonly baseProjection: {[K in keyof IRole]?: 1}
  constructor(Model: typeof RoleModel) {
    super(Model)

    this.baseProjection = {
      name: 1,
      permissions: 1,
      allowedEdit: 1,
      updatedAt: 1,
      createdAt: 1
    }
  }

  async updateRole(projectId: Types.ObjectId | string, roleId: Types.ObjectId | string, updateRole: UpdateRole) {
    return await this.findOneAndUpdate(
      {
        _id: new Types.ObjectId(roleId),
        projectId: new Types.ObjectId(projectId),
        allowedEdit: true
      },
      updateRole,
      {
        new: true,
        projection: this.baseProjection
      }
    )
  }

  async deleteRole(projectId: Types.ObjectId | string, roleId: Types.ObjectId | string) {
    return await this.findOneAndDelete(
      {
        _id: new Types.ObjectId(roleId),
        projectId: new Types.ObjectId(projectId),
        allowedEdit: true
      },
      {projection: {_id: 1}}
    )
  }

  findRoles(projectId: string | Types.ObjectId, page: PageOptions) {
    return this.findPage(
      page,
      {
        projectId: new Types.ObjectId(projectId)
      },
      this.baseProjection
    )
  }

  findGuestId(projectId: Types.ObjectId | string): Promise<{_id: Types.ObjectId} | null> {
    return this.findOne(
      {
        projectId: projectId,
        name: 'Guest'
      },
      {
        _id: 1
      }
    )
  }
}