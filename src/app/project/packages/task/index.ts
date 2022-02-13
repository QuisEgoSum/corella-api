import {initCounter} from './packages/counter'
import type {Counter} from './packages/counter'


export class Task {
  public readonly counter: Counter

  constructor(
    counter: Counter
  ) {
    this.counter = counter
  }
}

export async function initTask() {
  const counter = await initCounter()

  return new Task(counter)
}