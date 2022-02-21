import {BaseService} from '@core/service'
import {IStatus} from '@app/project/packages/task/packages/status/StatusModel'
import {StatusRepository} from '@app/project/packages/task/packages/status/StatusRepository'


export class StatusService extends BaseService<IStatus, StatusRepository> {
  constructor(repository: StatusRepository) {
    super(repository)
  }
}