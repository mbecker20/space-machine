import { Modules, ContainerModule } from '../../stateTSTypes'
import { AddModuleAction } from '../moduleTSTypes'
import { CONTAINER } from '../../../audioModules/moduleTypes'

const addModule = (state: Modules, { id, name, moduleType, row, col, parentID, connectionInputs, connectionOutputs }: AddModuleAction) => {
  switch(moduleType) {
    case CONTAINER: return Object.assign({}, state, {
      [id]: {
        id,
        name,
        row,
        col,
        parentID,
        moduleType,
        connectionInputs,
        connectionOutputs,
        inputs: [],
        outputs: [],
        childModules: [],
        isBaseContainer: false,
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
        connectionInputs,
        connectionOutputs,
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