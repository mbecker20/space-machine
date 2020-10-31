import { connect } from "../../../audioModules/connection";
import { ConnectingAudioModule, CONTAINER } from "../../../audioModules/moduleTypes";
import { Module, Connections, Modules } from "../../../redux/stateTSTypes"
import { Dispatch } from 'redux'
import { addConnection } from "../../../redux/allActions";
import { colors } from "../../../theme/theme";

export function connectionExists(connections: Connections, fromMod: Module, actualToID: string, newOutputIndex: number, newInputIndex: number, newParam = '') {
  for(var i = 0; i < fromMod.outputs.length; i++) {
    const { toID, actualInputID, param, outputIndex, inputIndex } = connections[fromMod.outputs[i]]
    const testingID = actualInputID ? actualInputID : toID
    if (
      testingID === actualToID && 
      newParam === param &&
      newOutputIndex === outputIndex &&
      newInputIndex === inputIndex
    ) {
      return true
    }
  }
  return false
}

export function executeConnection(
  fromID: string, 
  actualFromID: string,
  toID: string,
  actualToID: string,
  modules: Modules,
  connections: Connections,
  dispatch: Dispatch,
  outputIndex: number,
  inputIndex: number,
  onClose?: () => void,
  paramID = '',
) {
  const fromMod = modules[fromID]
  const am = window.audioModules
  const isFromContainer = fromMod.moduleType === CONTAINER
  const isToContainer = modules[toID].moduleType === CONTAINER
  if (!connectionExists(connections, fromMod as Module, actualToID, outputIndex, inputIndex, paramID)) {
    connect(
      am[actualFromID] as ConnectingAudioModule,
      am[actualToID] as ConnectingAudioModule,
      paramID,
      outputIndex,
      inputIndex,
    )
    dispatch(addConnection(
      fromID,
      toID,
      paramID,
      outputIndex,
      inputIndex,
      isFromContainer ? actualFromID : undefined,
      isToContainer ? actualToID : undefined,
    ))
    window.flashNotification(colors.success, 'connection created')
    if (onClose) onClose()
  } else {
    alert('modules already connected')
  }
}