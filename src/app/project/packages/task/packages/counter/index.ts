import {CounterService} from './CounterService'
import {CounterRepository} from './CounterRepository'
import {CounterModel} from './CounterModel'


export class Counter {
  public readonly service: CounterService
  constructor(
    counterService: CounterService
  ) {
    this.service = counterService
  }
}

export async function initCounter() {
  return new Counter(new CounterService(new CounterRepository(CounterModel)))
}