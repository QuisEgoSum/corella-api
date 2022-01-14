import {initCounter} from './packages/counter'
import type {Counter as CounterPkg} from './packages/counter'


export class Task {
  public readonly Counter: CounterPkg

  constructor(
    Counter: CounterPkg
  ) {
    this.Counter = Counter
  }
}

export async function initTask() {
  const Counter = await initCounter()

  return new Task(Counter)
}