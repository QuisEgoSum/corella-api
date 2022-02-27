import {BaseRepository} from '@core/repository'
import {ITask, TaskModel} from '@app/project/packages/task/TaskModel'
import {FilterQuery, Types, UpdateQuery} from 'mongoose'
import {DataList} from '@common/data'
import {TaskPreview, UpdateTask} from '@app/project/packages/task/schemas/entities'


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

  async updateTask(projectId: string, number: number, updateTask: UpdateTask, userId: Types.ObjectId): Promise<ITask | null> {
    const update: UpdateQuery<ITask> & {$set: Partial<ITask>} = {
      $set: {editorId: userId},
      $inc: {version: 1},
      $addToSet: {editors: userId}
    }
    if ('title' in updateTask) {
      update.$set.title = updateTask.title
    }
    if ('description' in updateTask) {
      update.$set.description = updateTask.description
    }
    return this.Model.findOneAndUpdate(
      {
        projectId: new Types.ObjectId(projectId),
        number: number
      },
      update,
      {
        new: true
      }
    )
      .select('+projectId')
      .lean()
      .exec()
  }
}