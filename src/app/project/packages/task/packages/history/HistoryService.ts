import {BaseService} from '@core/service'
import {IHistory} from '@app/project/packages/task/packages/history/HistoryModel'
import {HistoryRepository} from '@app/project/packages/task/packages/history/HistoryRepository'


export class HistoryService extends BaseService<IHistory, HistoryRepository> {
  constructor(repository: HistoryRepository) {
    super(repository)
  }
}