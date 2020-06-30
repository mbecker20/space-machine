import { ContainerModules } from '../../stateTSTypes'
import { AddModuleAction } from '../moduleTSTypes'
import { CONTAINER } from '../../../modules/moduleTypes'

const addmodule = (state: ContainerModules, { id, row, col, parentID }: AddContainerAction) => {
  return Object.assign({}, state, {
    [id]: {
      id,
      row,
      col,
      parentID,
      type: CONTAINER,
      inputs: null,
      outputs: null,
      childContainers: [],
      childModules: [],
      controls: {},
      isBaseContainer: false,
    },
    [parentID]: {
      ...state[parentID],
      childContainers: [
        ...state[parentID].childContainers,
        id
      ]
    }
  })
}

export default addContainer