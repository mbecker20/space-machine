import { stringIn } from "../helpers/genFuncs"

export function filterOutFromObj<ObjType>(obj: ObjType, idsToFilterOut: string[]) {
  return Object.fromEntries(Object.entries(obj).filter(entry => {
    return !stringIn(entry[0], idsToFilterOut)
  }))
}

export function keepOnlyIdsInObj<ObjType>(obj: ObjType, idsToKeep: string[]) {
  return Object.fromEntries(Object.entries(obj).filter(entry => {
    return stringIn(entry[0], idsToKeep)
  }))
}

export function ObjFrom2Arrays(arr1: string[], arr2: any[]) {
  if (arr1.length === arr2.length) {
    return Object.fromEntries(arr1.map((id, index) => {
      return [id, arr2[index]]
    }))
  }
  return false
}