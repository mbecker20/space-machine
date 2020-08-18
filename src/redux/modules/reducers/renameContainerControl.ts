import { Modules, ContainerModule } from "../../stateTSTypes"
import { RenameContainerControlAction } from "../moduleTSTypes"

const renameContainerControl = (modules: Modules, { name, parentModID, modID, controlID, actualModID }: RenameContainerControlAction) => {
  const containerMod = modules[parentModID] as ContainerModule
  return Object.assign({}, modules, {
    [parentModID]: {
      ...containerMod,
      containerControls: containerMod.containerControls.map((containerControl) => {
        const isControl = (
          containerControl.modID === modID ||
          containerControl.controlID === controlID ||
          containerControl.actualModID === actualModID
        )
        if (isControl) {
          return {
            ...containerControl,
            name: name
          }
        } else {
          return containerControl
        }
      })
    }
  })
}

export default renameContainerControl