import { Modules, ContainerModule } from '../../stateTSTypes'
import { AddModuleAction } from '../moduleTSTypes'
import { CONTAINER, OSCILLATOR, GATE, OUTPUT } from '../../../modules/moduleTypes'

const addModule = (state: Modules, { id, moduleType, row, col, parentID }: AddModuleAction) => {
  switch(moduleType) {
    case CONTAINER: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        inputs: null,
        outputs: null,
        childModules: [],
        controls: {},
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
    case OSCILLATOR: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        inputs: null,
        outputs: null,
        controls: {},
      },
      [parentID]: {
        ...state[parentID],
        childModules: [
          ...(state[parentID] as ContainerModule).childModules,
          id
        ]
      }
    })
    case GATE: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        inputs: null,
        outputs: null,
        controls: {},
      },
      [parentID]: {
        ...state[parentID],
        childModules: [
          ...(state[parentID] as ContainerModule).childModules,
          id
        ]
      }
    })
    case OUTPUT: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        inputs: null,
        outputs: null,
        controls: {},
      },
      [parentID]: {
        ...state[parentID],
        childModules: [
          ...(state[parentID] as ContainerModule).childModules,
          id
        ]
      }
    })
    default: return state
  }
}

export default addModule