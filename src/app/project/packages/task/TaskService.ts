import {BaseService} from '@core/service'
import {ITask} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'


export class TaskService extends BaseService<ITask, TaskRepository> {
  constructor(repository: TaskRepository) {
    super(repository)
  }
}