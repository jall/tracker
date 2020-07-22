import * as uuid from "uuid"
import {Aim, Effort} from "./aims/types"

export function notNothing<T>(input: T | null | undefined): input is T {
  return input != null
}

export function createStubAims(): Array<Aim> {
  return [
    {id: uuid.v4(), title: "Pullups", efforts: createStubEfforts()},
    {id: uuid.v4(), title: "Curls", efforts: createStubEfforts()},
  ]
}

export function createStubEfforts(): Array<Effort> {
  return [
    {id: uuid.v4(), amount: 3, achievedAt: new Date()},
    {id: uuid.v4(), amount: 1, achievedAt: new Date()},
    {id: uuid.v4(), amount: 6, achievedAt: new Date()},
  ]
}

export function accumulate<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) {
  let timeout: NodeJS.Timeout | undefined
  let invocations: Array<ReturnType<F>> = []

  const reset = () => {
    timeout = undefined
    invocations = []
  }

  return (...args: Parameters<F>): Promise<Array<ReturnType<F>>> =>
    new Promise((resolve) => {
      invocations.push(func(args))

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        resolve(invocations)
        reset()
      }, waitFor)
    })
}
