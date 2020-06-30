import { Modules, ContainerModule } from "../../stateTSTypes";
import { RemoveModuleAction } from "../moduleTSTypes";

const removeModule = (state: Modules, { id }: RemoveModuleAction) => {
  const parentID = state[id].parentID as string
  return Object.assign({}, Object.fromEntries(Object.entries(state).filter(entry => entry[0] !== id)), {
    [parentID]: {
      ...state[parentID],
      childModules: (state[parentID] as ContainerModule).childModules.filter(childID => childID !== id)
    }
  })
}

export default removeModule