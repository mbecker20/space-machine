import { Modules, ContainerModule } from "../../stateTSTypes"
import { RenameModuleAction } from "../moduleTSTypes"
import { filterOutFromObj, keepOnlyIdsInObj, ObjFrom2Arrays } from '../../helpers'
import { CONTAINER } from "../../../audioModules/moduleTypes"

function makeNewParent(state: Modules, id: string, newID: string, parentID: string) {
  return (state[id] as ContainerModule).isBaseContainer ? {} : {
    [parentID]: {
      ...state[parentID],
      childContainers: [
        ...(state[parentID] as ContainerModule).childModules.filter(entry => entry !== id),
        newID,
      ]
    }
  }
}

function makeNewChildren(state: Modules, id: string, newID: string) {
  if(state[id].moduleType === CONTAINER) {
    const childContainerIDs = (state[id] as ContainerModule).childModules
    const oldChildren = Object.values(keepOnlyIdsInObj(state, childContainerIDs))
    const newChildren = oldChildren.map(child => {
      return {
        ...child,
        parentID: newID,
      }
    })
    return ObjFrom2Arrays(childContainerIDs, newChildren)
  } else {
    return {}
  }
}

const renameContainer = (state: Modules, { id, newID }: RenameModuleAction) => {
  const parentID = state[id].parentID as string
  return Object.assign({}, filterOutFromObj(state, [id, parentID]), {
    [newID]: {
      ...state[id],
      id: newID
    },
  }, makeNewParent(state, id, newID, parentID), makeNewChildren(state, id, newID))
}

export default renameContainer