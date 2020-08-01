import { RootState } from "./stateTSTypes"
import restoreAudioModule from "../audioModules/restoreAudioModule"
import { ModuleType, ConnectingAudioModule, MEDIA_ELEMENT } from "../audioModules/moduleTypes"
import { connect } from "../audioModules/connection"

export function restoreFromState({ modules, connections }: RootState) {
  Object.keys(modules).forEach(modID => {
    const { moduleType, controlData } = modules[modID]
    restoreAudioModule(modID, moduleType as ModuleType, controlData)
  })
  Object.keys(connections).forEach(connectionID => {
    const { fromID, toID, param, outputIndex, inputIndex, actualOutputID, actualInputID } = connections[connectionID]
    const involvesMediaElement = modules[actualOutputID ? actualOutputID : fromID].moduleType === MEDIA_ELEMENT ||
      modules[actualInputID ? actualInputID : toID].moduleType === MEDIA_ELEMENT
    if (!involvesMediaElement) {
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
      }, 50)
    }
  })
}