import { Modules, ContainerModule } from "../../stateTSTypes";
import { MarkContainerControlAction } from "../moduleTSTypes";
import { CONTAINER } from "../../../audioModules/moduleTypes";

const unmarkContainerControl = (state: Modules, { modID, controlID, actualModID }: MarkContainerControlAction): Modules => {
  const parentID = state[modID].parentID as string
  if (state[modID].moduleType === CONTAINER) {
    return Object.assign({}, state, {
      [modID]: {
        ...state[modID],
        containerControls: (state[modID] as ContainerModule).containerControls.map(containerControl => {
          if (
            containerControl.controlID !== controlID ||
            containerControl.actualModID !== actualModID
          ) {
            return containerControl
          } else {
            return {
              ...containerControl,
              markedToContainer: false,
            }
          }
        })
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
  } else {
    return Object.assign({}, state, {
      [actualModID]: {
        ...state[actualModID],
        controlData: {
          ...state[actualModID].controlData,
          [controlID]: {
            ...state[actualModID].controlData[controlID],
            markedToContainer: false,
          }
        }
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
}

export default unmarkContainerControl