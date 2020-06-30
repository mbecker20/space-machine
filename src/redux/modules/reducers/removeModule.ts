import { ContainerModules } from "../../stateTSTypes";
import { RemoveContainerAction } from "../moduleTSTypes";

const removeContainer = (state: ContainerModules, { id }: RemoveContainerAction) => {
  const parentID = state[id].parentID as string
  return Object.assign({}, Object.fromEntries(Object.entries(state).filter(entry => entry[0] !== id)), {
    [parentID]: {
      ...state[parentID],
      childContainers: state[parentID].childContainers.filter(childID => childID !== id)
    }
  })
}

export default removeContainer