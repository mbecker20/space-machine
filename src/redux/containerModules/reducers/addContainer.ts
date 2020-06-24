import { ContainerModules } from '../../stateTSTypes'
import { AddContainerAction } from '../cmTSTypes'

const addContainer = (state: ContainerModules, { id, row, col, parentID }: AddContainerAction) => {
  return Object.assign({}, state, {
    [id]: {
      id,
      row,
      col,
      parentID,
      inputs: null,
      outputs: null,
      childContainers: [],
      childModules: [],
      controls: {},
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