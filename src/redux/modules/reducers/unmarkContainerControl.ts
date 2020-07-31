import { Modules, ContainerModule } from "../../stateTSTypes";
import { MarkContainerControlAction } from "../moduleTSTypes";

const unmarkContainerControl = (state: Modules, { modID, controlID, actualModID }: MarkContainerControlAction): Modules => {
  const parentID = state[modID].parentID as string
  return Object.assign({}, state, {
    [modID]: {
      ...state[modID],
      toContainerControls: state[modID].toContainerControls.filter(toContainerControlID => toContainerControlID !== actualModID+controlID)
    },
    [parentID]: {
      ...state[parentID],
      containerControls: (state[parentID] as ContainerModule).containerControls.filter(containerControl => {
        return containerControl.modID !== modID || 
          containerControl.controlID !== controlID || 
          containerControl.actualModID !== actualModID
      }),
    }
  })
}

export default unmarkContainerControl