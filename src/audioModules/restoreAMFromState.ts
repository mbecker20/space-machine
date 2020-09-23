import { RootState, Connections } from "../redux/stateTSTypes"
import restoreAudioModule from "./restoreAudioModule"
import { ModuleType, ConnectingAudioModule, MEDIA_ELEMENT, LINE_IN } from "./moduleTypes"
import { connect, disconnect } from "./connection"

function connectLate(numTries: number, fromID: string, toID: string, param: string, outputIndex: number, inputIndex: number, actualOutputID?: string, actualInputID?: string) {
  if (numTries > 10) {
    alert('restore failed')
  } else {
    window.setTimeout(() => {
      if (window.audioModules[actualOutputID ? actualOutputID : fromID] && window.audioModules[actualInputID ? actualInputID : toID]) {
        connect(
          window.audioModules[actualOutputID ? actualOutputID : fromID] as ConnectingAudioModule,
          window.audioModules[actualInputID ? actualInputID : toID] as ConnectingAudioModule,
          param,
          outputIndex,
          inputIndex,
        )
      } else {
        connectLate(numTries + 1, fromID, toID, param, outputIndex, inputIndex, actualOutputID, actualInputID)
      }
    }, 500)
  }
}

function restoreAMFromState(prevConnections: Connections, { modules, connections }: RootState) {
  Object.keys(prevConnections).forEach(connectionID => {
    const { fromID, toID, param, outputIndex, actualOutputID, actualInputID } = prevConnections[connectionID]
    if (window.audioModules[actualOutputID ? actualOutputID : fromID] && window.audioModules[actualInputID ? actualInputID : toID]) {
      disconnect(
        window.audioModules[actualOutputID ? actualOutputID : fromID] as ConnectingAudioModule,
        window.audioModules[actualInputID ? actualInputID : toID] as ConnectingAudioModule,
        param,
        outputIndex, // may need to figure out how to pass in inputIndex
      )
    }
  })
  window.numberRestores++
  window.audioModules = {}
  window.audioTags = {}
  Object.keys(modules).forEach(modID => {
    const { moduleType, controlData } = modules[modID]
    restoreAudioModule(modID, moduleType as ModuleType, controlData)
  })
  if (connections) {
    Object.keys(connections).forEach(connectionID => {
      const { fromID, toID, param, outputIndex, inputIndex, actualOutputID, actualInputID } = connections[connectionID]
      const toType = modules[actualInputID ? actualInputID : toID].moduleType
      const fromType = modules[actualOutputID ? actualOutputID : fromID].moduleType
      const needsToWait = toType === MEDIA_ELEMENT || fromType === MEDIA_ELEMENT ||
        toType === LINE_IN || fromType === LINE_IN
      if (!needsToWait) {
        connect(
          window.audioModules[actualOutputID ? actualOutputID : fromID] as ConnectingAudioModule,
          window.audioModules[actualInputID ? actualInputID : toID] as ConnectingAudioModule,
          param,
          outputIndex,
          inputIndex,
        )
      } else {
        connectLate(0, fromID, toID, param, outputIndex, inputIndex, actualOutputID, actualInputID)
      }
    })
  }
}

export default restoreAMFromState