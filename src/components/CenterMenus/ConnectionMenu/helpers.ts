import { Module, Connections } from "../../../redux/stateTSTypes";

export function connectionExists(connections: Connections, fromMod: Module, actualToID: string, newParam = '') {
  for(var i = 0; i < fromMod.outputs.length; i++) {
    const { actualInputID, param } = connections[fromMod.outputs[i]]
    if (actualInputID === actualToID && newParam === param) {
      return true
    }
  }
  return false
}