import {BaseService} from '@core/service'
import {ITask} from '@app/project/packages/task/TaskModel'
import {TaskRepository} from '@app/project/packages/task/TaskRepository'
import {Types} from 'mongoose'
import {CreateTask, FindTasksQuery, TaskPreview} from '@app/project/packages/task/schemas/entities'
import {StatusService} from '@app/project/packages/task/packages/status/StatusService'
import {CounterService} from '@app/project/packages/task/packages/counter/CounterService'
import {HistoryService} from '@app/project/packages/task/packages/history/HistoryService'
import {IHistory} from '@app/project/packages/task/packages/history/HistoryModel'
import {DataList} from '@common/data'


export class TaskService extends BaseService<ITask, TaskRepository> {
  private statusService: StatusService
  private counterService: CounterService
  private historyService: HistoryService
  constructor(
    repository: TaskRepository,
    statusService: StatusService,
    counterService: CounterService,
    historyService: HistoryService
  ) {
    super(repository)
    this.statusService = statusService
    this.counterService = counterService
    this.historyService = historyService
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

    const history: Partial<IHistory> = {taskId: task._id, ...task}

    delete history._id

    await this.historyService.create(history)

    return task
  }

  async find(projectId: string, query: FindTasksQuery): Promise<DataList<TaskPreview>> {
    const projectObjectId = new Types.ObjectId(projectId)
    let statusObjectId
    if (query.status) {
      statusObjectId = new Types.ObjectId(query.status)
      await this.statusService.existsInProject(projectObjectId, statusObjectId)
    }
    return await this.repository.findPreviewPage({
      projectId: projectObjectId,
      status: statusObjectId,
      page: query.page,
      limit: query.limit
    })
  }
}