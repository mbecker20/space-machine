export function filterObj<ObjType>(obj: ObjType, ids: string[]) {
  return Object.fromEntries(Object.entries(obj).filter(entry => {
    for (var i = 0; i < ids.length; i++) {
      if (entry[0] === ids[i]) {
        return false
      }
    }
    return true
  }))
}