import { ContainerModules } from '../../stateTSTypes'
import { AddContainerAction } from '../cmTSTypes'
import { CONTAINER } from '../../../modules/moduleTypes'

const addContainer = (state: ContainerModules, { id, row, col, parentID }: AddContainerAction) => {
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