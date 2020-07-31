import { RootState } from "../stateTSTypes"

export interface RestoreFromStateAction {
  type: string
  state: RootState
}

export type RootAction = RestoreFromStateAction