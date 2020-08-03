import { RootState } from "./stateTSTypes"
import restoreAudioModule from "../audioModules/restoreAudioModule"
import { ModuleType, ConnectingAudioModule, MEDIA_ELEMENT, LINE_IN } from "../audioModules/moduleTypes"
import { connect } from "../audioModules/connection"

export function restoreFromState({ modules, connections }: RootState) {
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
        window.setTimeout(() => {
          connect(
            window.audioModules[actualOutputID ? actualOutputID : fromID] as ConnectingAudioModule,
            window.audioModules[actualInputID ? actualInputID : toID] as ConnectingAudioModule,
            param,
            outputIndex,
            inputIndex,
          )
        }, 200)
      }
    })
  }
}