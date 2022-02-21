import {BaseRepository} from '@core/repository'
import {IStatus, StatusModel} from '@app/project/packages/task/packages/status/StatusModel'


export class StatusRepository extends BaseRepository<IStatus> {
  constructor(Model: typeof StatusModel) {
    super(Model)
  }
}