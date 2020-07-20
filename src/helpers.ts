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
