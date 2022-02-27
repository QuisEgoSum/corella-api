import {BaseService} from '@core/service'
import {IStatus} from '@app/project/packages/task/packages/status/StatusModel'
import {StatusRepository} from '@app/project/packages/task/packages/status/StatusRepository'
import {DefaultStatus} from '@app/project/packages/task/packages/status/DefaultStatus'
import {OrderService} from '@app/project/packages/task/packages/status/packages/order/OrderService'
import {ModifierService} from '@app/project/packages/task/packages/status/packages/modifier/ModifierService'
import {Types} from 'mongoose'
import {StatusModifier} from '@app/project/packages/task/packages/status/packages/modifier'
import {TaskStatusNotExistsError} from '@app/project/packages/task/packages/status/status-error'


export class StatusService extends BaseService<IStatus, StatusRepository> {
  private orderService: OrderService
  private modifierService: ModifierService
  constructor(
    repository: StatusRepository,
    orderService: OrderService,
    modifierService: ModifierService
  ) {
    super(repository)
    this.orderService = orderService
    this.modifierService = modifierService

    this.Error.EntityNotExistsError = TaskStatusNotExistsError
  }

  async createDefault(projectId: string | Types.ObjectId) {
    projectId = new Types.ObjectId(projectId)
    const [newStatus, doneStatus, closeStatus] = await Promise.all([
      this.repository.create({projectId: projectId, name: DefaultStatus.NEW}),
      this.repository.create({projectId: projectId, name: DefaultStatus.DONE}),
      this.repository.create({projectId: projectId, name: DefaultStatus.CLOSE})
    ])
    await Promise.all([
      this.orderService.create({
        _id: projectId,
        statuses: [newStatus._id, doneStatus._id]
      }),
      this.modifierService.create({
        _id: projectId,
        statuses: [
          {
            _id: newStatus._id,
            modifier: StatusModifier.DEFAULT
          },
          {
            _id: doneStatus._id,
            modifier: StatusModifier.DONE
          },
          {
            _id: closeStatus._id,
            modifier: StatusModifier.CLOSE
          }
        ]
      })
    ])
  }

  async existsInProject(projectId: Types.ObjectId, id: Types.ObjectId) {
    await this.findOne(
      {
        projectId,
        _id: id
      },
      {_id: 1}
    )
  }

  async findDefaultStatusId(projectObjectId: Types.ObjectId) {
    return await this.modifierService.findDefaultStatusId(projectObjectId)
  }
}