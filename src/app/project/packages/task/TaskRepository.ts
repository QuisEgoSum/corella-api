import {BaseRepository} from '@core/repository'
import {ITask, TaskModel} from '@app/project/packages/task/TaskModel'
import {FilterQuery, Types} from 'mongoose'
import {DataList} from '@common/data'
import {TaskPreview} from '@app/project/packages/task/schemas/entities'


export interface FindPreviewPageOptions {
  limit: number
  page: number
  projectId: Types.ObjectId
  status?: Types.ObjectId
}


export class TaskRepository extends BaseRepository<ITask> {
  constructor(Model: typeof TaskModel) {
    super(Model)
  }

  async findPreviewPage(options: FindPreviewPageOptions): Promise<DataList<TaskPreview>> {
    const query: FilterQuery<ITask> = {projectId: options.projectId}
    if (options.status) {
      query.status = options.status
    }
    return await this.findPage(
      {
        limit: options.limit,
        page: options.page
      },
      query,
      {
        number: 1,
        title: 1,
        status: 1,
        createdAt: 1
      },
      {
        sort: {
          createdAt: -1
        }
      }
    )
  }
}