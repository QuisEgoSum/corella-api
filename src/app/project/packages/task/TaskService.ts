import {BaseService} from '@core/service'
import {ITask} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'
import {Types} from 'mongoose'
import {CreateTask} from '@app/project/packages/task/schemas/entities'
import {StatusService} from '@app/project/packages/task/packages/status/StatusService'
import {CounterService} from '@app/project/packages/task/packages/counter/CounterService'


export class TaskService extends BaseService<ITask, TaskRepository> {
  private statusService: StatusService
  private counterService: CounterService
  constructor(
    repository: TaskRepository,
    statusService: StatusService,
    counterService: CounterService
  ) {
    super(repository)
    this.statusService = statusService
    this.counterService = counterService
  }

  async createTask(projectId: string | Types.ObjectId, createTask: CreateTask, userId: Types.ObjectId): Promise<ITask> {
    const projectObjectId = new Types.ObjectId(projectId)
    const statusObjectId = new Types.ObjectId(createTask.status)
    await this.statusService.existsInProject(projectObjectId, statusObjectId)

    const number = await this.counterService.inc(projectObjectId)

    const task = await this.create({
      number: number,
      title: createTask.title,
      description: createTask.description,
      status: statusObjectId,
      projectId: projectObjectId,
      version: 1,
      creatorId: userId,
      editorId: userId,
      editors: [userId]
    })

    return task
  }
}