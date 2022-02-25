import {BaseRepository} from '@core/repository'
import {IStatus, StatusModel} from '@app/project/packages/task/packages/status/StatusModel'
import {Types} from 'mongoose'


export class StatusRepository extends BaseRepository<IStatus> {
  constructor(Model: typeof StatusModel) {
    super(Model)
  }

  async findByProjectId(projectId: Types.ObjectId): Promise<IStatus[]> {
    return this.Model.find(
      {
        projectId: projectId
      },
      {
        name: 1
      }
    )
  }
}