import {BaseRepository} from '@core/repository'
import {ITask, TaskModel} from '@app/project/packages/task/TaskModel'


export class TaskRepository extends BaseRepository<ITask> {
  constructor(Model: typeof TaskModel) {
    super(Model)
  }
}