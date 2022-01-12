import {initCounter} from './packages/counter'


export async function initTask() {
  const Counter = await initCounter()

  return {
    Counter
  }
}