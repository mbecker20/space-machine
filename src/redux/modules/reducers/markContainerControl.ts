import { Modules, ContainerModule } from "../../stateTSTypes";
import { MarkContainerControlAction } from "../moduleTSTypes";
import { CONTAINER } from "../../../audioModules/moduleTypes";

const markContainerControl = (state: Modules, { modID, controlID, actualModID, name }: MarkContainerControlAction): Modules => {
  const parentID = state[modID].parentID as string
  if (state[modID].moduleType === CONTAINER) {
    return Object.assign({}, state, {
      [modID]: {
        ...state[modID],
        containerControls: (state[modID] as ContainerModule).containerControls.map(containerControl => {
          if (
            containerControl.controlID !== controlID ||
            containerControl.modID !== modID ||
            containerControl.actualModID !== actualModID
          ) {
            return containerControl
          } else {
            return {
              ...containerControl,
              markedToContainer: true,
            }
          }
        })
      },
      [parentID]: {
        ...state[parentID],
        containerControls: [...(state[parentID] as ContainerModule).containerControls, { modID, controlID, actualModID, name }],
      }
    })
  } else {
    return Object.assign({}, state, {
      [actualModID]: {
        ...state[actualModID],
        controlData: {
          ...state[actualModID].controlData,
          [controlID]: {
            ...state[actualModID].controlData[controlID],
            markedToContainer: true,
          }
        }
      },
      [parentID]: {
        ...state[parentID],
        containerControls: [...(state[parentID] as ContainerModule).containerControls, { modID, controlID, actualModID, name, markedToContainer: false }],
      }
    })
  }
}

export default markContainerControl