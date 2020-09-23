import { Modules, ContainerModule } from "../../stateTSTypes"
import { RenameContainerControlAction } from "../moduleTSTypes"

const renameContainerControl = (modules: Modules, { name, parentModID, modID, controlID, actualModID }: RenameContainerControlAction) => {
  const containerMod = modules[parentModID] as ContainerModule
  return Object.assign({}, modules, {
    [parentModID]: {
      ...containerMod,
      containerControls: containerMod.containerControls.map(containerControl => {
        const notRightControl = (
          containerControl.controlID !== controlID ||
          containerControl.actualModID !== actualModID
        )
        if (notRightControl) {
          return containerControl
        } else {
          return {
            ...containerControl,
            name: name
          }
        }
      })
    }
  })
}

export default renameContainerControl