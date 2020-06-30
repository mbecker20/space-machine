import { Modules, ContainerModule } from '../../stateTSTypes'
import { AddModuleAction } from '../moduleTSTypes'
import { CONTAINER, OSCILLATOR } from '../../../modules/moduleTypes'

const addModule = (state: Modules, { id, moduleType, row, col, parentID }: AddModuleAction) => {
  switch(moduleType) {
    case CONTAINER: return Object.assign({}, state, {
      [id]: {
        id,
        row,
        col,
        parentID,
        moduleType,
        type: CONTAINER,
        inputs: null,
        outputs: null,
        childModules: [],
        controls: {},
        isBaseContainer: false,
      },
      [parentID]: {
        ...state[parentID],
        childContainers: [
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
        type: OSCILLATOR,
        inputs: null,
        outputs: null,
        controls: {},
      },
      [parentID]: {
        ...state[parentID],
        childContainers: [
          ...(state[parentID] as ContainerModule).childModules,
          id
        ]
      }
    })
  }
}

export default addModule