import {BaseRepository} from '@core/repository'
import {HistoryModel, IHistory} from '@app/project/packages/task/packages/history/HistoryModel'


export class HistoryRepository extends BaseRepository<IHistory> {
  constructor(Model: typeof HistoryModel) {
    super(Model)
  }
}