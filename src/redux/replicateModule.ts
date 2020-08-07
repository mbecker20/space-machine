import { RootState } from "./stateTSTypes"
import genRandomID from './idGen'
import { Dispatch } from 'redux'
import { addModule } from './allActions'
import { ModuleType } from "../audioModules/moduleTypes"
import restoreAudioModule from "../audioModules/restoreAudioModule"

function duplicateModule(dispatch: Dispatch, state: RootState, modID: string, row: number, col: number) {
  const newID = genRandomID(0, Object.keys(state.modules).length)
  const { name, moduleType, controlData, parentID, connectionInputs, connectionOutputs } = state.modules[modID]
  restoreAudioModule(newID, moduleType as ModuleType, controlData)
  dispatch(addModule(newID, name, moduleType as ModuleType, controlData, parentID as string, row, col, connectionInputs, connectionOutputs))
}

export default duplicateModule