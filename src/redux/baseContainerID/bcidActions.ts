import { DOWN_1_BASE, CHANGE_BASE } from './bcidActionTypes'

export const down1Base = (newID: string) => {
  return {
    type: DOWN_1_BASE,
    newID
  }
}

export const changeBase = (newID: string) => {
  return {
    type: CHANGE_BASE,
    newID
  }
}