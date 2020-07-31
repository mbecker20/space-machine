import { RootState } from "./stateTSTypes"
import restoreAudioModule from "../audioModules/restoreAudioModule"
import { ModuleType, ConnectingAudioModule } from "../audioModules/moduleTypes"
import { connect } from "../audioModules/connection"

export function restoreFromState({ modules, connections }: RootState) {
  Object.keys(modules).forEach(modID => {
    const { moduleType, controlData } = modules[modID]
    restoreAudioModule(modID, moduleType as ModuleType, controlData)
  })
  Object.keys(connections).forEach(connectionID => {
    const { fromID, toID, param, outputIndex, inputIndex, actualOutputID, actualInputID } = connections[connectionID]
    connect(
      window.audioModules[actualOutputID ? actualOutputID : fromID] as ConnectingAudioModule,
      window.audioModules[actualInputID ? actualInputID : toID] as ConnectingAudioModule,
      param,
      outputIndex,
      inputIndex,
    )
  })
}