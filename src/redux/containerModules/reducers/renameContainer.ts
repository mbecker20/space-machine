import { ContainerModules } from "../../stateTSTypes"
import { RenameContainerAction } from "../cmTSTypes"
import { filterObj } from '../../helpers'

const renameContainer = (state: ContainerModules, { id, newID }: RenameContainerAction) => {
  const parentID = state[id].parentID as string
  return Object.assign({}, filterObj(state, [newID]), {
    [newID]: {
      ...state[id],
      id: newID
    },
    [parentID]: {
      ...state[parentID],
      childContainers: [
        ...state[parentID].childContainers.filter(entry => entry !== id),
        newID,
      ]
    }
  })
}

export default renameContainer