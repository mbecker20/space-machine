import { Modules, ContainerModule } from "../../stateTSTypes";
import { MarkContainerControlAction } from "../moduleTSTypes";

const markContainerControl = (state: Modules, { modID, controlID }: MarkContainerControlAction): Modules => {
  const parentID = state[modID].parentID as string
  return Object.assign({}, state, {
    [parentID]: {
      ...state[parentID],
      containerControls: [...(state[parentID] as ContainerModule).containerControls, { modID, controlID }],
    }
  })
}

export default markContainerControl