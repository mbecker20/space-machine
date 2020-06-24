import { DOWN_1_BASE } from './bcidActionTypes'

export const down1Base = (newID: string) => {
  return {
    type: DOWN_1_BASE,
    newID
  }
}