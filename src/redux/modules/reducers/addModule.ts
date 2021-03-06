import { Modules, ContainerModule } from '../../stateTSTypes'
import { AddModuleAction } from '../moduleTSTypes'
import { CONTAINER } from '../../../audioModules/moduleTypes'

const addModule = (state: Modules, { id, name, moduleType, controlData, row, col, parentID, connectionInputs, connectionOutputs }: AddModuleAction): Modules => {
  switch(moduleType) {
    case CONTAINER: return Object.assign({}, state, {
      [id]: {
        id,
        name,
        row,
        col,
        parentID,
        moduleType,
        controlData,
        connectionInputs,
        connectionOutputs,
        inputs: [],
        outputs: [],
        containerControls: [],
        toContainerControls: [],
        childModules: [],
        isBaseContainer: false,
        isContainerInput: false,
        isContainerOutput: false,
      },
      [parentID]: {
        ...state[parentID],
        childModules: [
          ...(state[parentID] as ContainerModule).childModules,
          id
        ]
      }
    })
    default: return Object.assign({}, state, {
      [id]: {
        id,
        name,
        row,
        col,
        parentID,
        moduleType,
        controlData,
        connectionInputs,
        connectionOutputs,
        toContainerControls: [],
        isContainerInput: false,
        isContainerOutput: false,
        inputs: [],
        outputs: [],
      },
      [parentID]: {
        ...state[parentID],
        childModules: [
          ...(state[parentID] as ContainerModule).childModules,
          id
        ]
      }
    })
  }
}

export default addModule