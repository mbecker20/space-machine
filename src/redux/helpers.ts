export function filterOutFromObj<ObjType>(obj: ObjType, idsToFilterOut: string[]) {
  return Object.fromEntries(Object.entries(obj).filter(entry => {
    for (var i = 0; i < idsToFilterOut.length; i++) {
      if (entry[0] === idsToFilterOut[i]) {
        return false
      }
    }
    return true
  }))
}

export function keepOnlyIdsInObj<ObjType>(obj: ObjType, idsToKeep: string[]) {
  return Object.fromEntries(Object.entries(obj).filter(entry => {
    for (var i = 0; i < idsToKeep.length; i++) {
      if (entry[0] === idsToKeep[i]) {
        return true
      }
    }
    return false
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