import { ContainerModules } from "../../stateTSTypes"
import { RenameContainerAction } from "../moduleTSTypes"
import { filterOutFromObj, keepOnlyIdsInObj, ObjFrom2Arrays } from '../../helpers'

function makeNewParent(state: ContainerModules, id: string, newID: string, parentID: string) {
  return state[id].isBaseContainer ? {} : {
    [parentID]: {
      ...state[parentID],
      childContainers: [
        ...state[parentID].childContainers.filter(entry => entry !== id),
        newID,
      ]
    }
  }
}

function makeNewChildren(state: ContainerModules, id: string, newID: string) {
  const childContainerIDs = state[id].childContainers
  const oldChildren = Object.values(keepOnlyIdsInObj(state, childContainerIDs))
  const newChildren = oldChildren.map(child => {
    return {
      ...child,
      parentID: newID,
    }
  })
  return ObjFrom2Arrays(childContainerIDs, newChildren)
}

const renameContainer = (state: ContainerModules, { id, newID }: RenameContainerAction) => {
  const parentID = state[id].parentID as string
  return Object.assign({}, filterOutFromObj(state, [id, parentID, ]), {
    [newID]: {
      ...state[id],
      id: newID
    },
  }, makeNewParent(state, id, newID, parentID), makeNewChildren(state, id, newID))
}

export default renameContainer