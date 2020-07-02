import { Modules } from "../../stateTSTypes"
import { RenameModuleAction } from "../moduleTSTypes"

const renameContainer = (state: Modules, { id, newName }: RenameModuleAction) => {
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      name: newName
    },
  })
}

export default renameContainer