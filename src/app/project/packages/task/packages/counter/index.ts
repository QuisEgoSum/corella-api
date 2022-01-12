import {CounterService} from './CounterService'
import {CounterRepository} from './CounterRepository'
import {CounterModel} from './CounterModel'


export async function initCounter() {
  const service = new CounterService(new CounterRepository(CounterModel))

  return {
    service
  }
}