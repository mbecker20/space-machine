import { Modules, ContainerModule } from "../../stateTSTypes";
import { MarkContainerControlAction } from "../moduleTSTypes";

const markContainerControl = (state: Modules, { modID, controlID, actualModID, name }: MarkContainerControlAction): Modules => {
  const parentID = state[modID].parentID as string
  return Object.assign({}, state, {
    [modID]: {
      ...state[modID],
      toContainerControls: [ ...state[modID].toContainerControls, actualModID+controlID ]
    },
    [parentID]: {
      ...state[parentID],
      containerControls: [...(state[parentID] as ContainerModule).containerControls, { modID, controlID, actualModID, name }],
    }
  })
}

export default markContainerControl