import { Modules, ContainerModule } from "../../stateTSTypes";
import { MarkContainerControlAction } from "../moduleTSTypes";

const unmarkContainerControl = (state: Modules, { modID, controlID }: MarkContainerControlAction): Modules => {
  const parentID = state[modID].parentID as string
  return Object.assign({}, state, {
    [modID]: {
      ...state[modID],
      toContainerControls: state[modID].toContainerControls.filter(toContainerControlID => toContainerControlID !== controlID)
    },
    [parentID]: {
      ...state[parentID],
      containerControls: (state[parentID] as ContainerModule).containerControls.filter(containerControl => {
        return containerControl.modID !== modID || containerControl.controlID !== controlID
      }),
    }
  })
}

export default unmarkContainerControl