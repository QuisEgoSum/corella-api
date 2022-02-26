import {HistoryModel} from '@app/project/packages/task/packages/history/HistoryModel'
import {HistoryRepository} from '@app/project/packages/task/packages/history/HistoryRepository'
import {HistoryService} from '@app/project/packages/task/packages/history/HistoryService'


class History {
  public readonly service: HistoryService
  constructor(
    service: HistoryService
  ) {
    this.service = service
  }
}


export async function initHistory(): Promise<History> {
  return new History(new HistoryService(new HistoryRepository(HistoryModel)))
}


export type {
  History
}