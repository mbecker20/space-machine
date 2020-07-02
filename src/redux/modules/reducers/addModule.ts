import { Modules, ContainerModule } from '../../stateTSTypes'
import { AddModuleAction } from '../moduleTSTypes'
import { CONTAINER, OSCILLATOR, GATE, OUTPUT } from '../../../audioModules/moduleTypes'

const addModule = (state: Modules, { id, moduleType, row, col, parentID }: AddModuleAction) => {
  switch(moduleType) {
    case CONTAINER: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        inputs: [],
        outputs: [],
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
    default: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        inputs: [],
        outputs: [],
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
  }
}

export default addModule