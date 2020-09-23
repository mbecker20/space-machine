import { stringIn } from "../../../helpers/genFuncs"
import { getContainerModulesConnections } from "../../../redux/getContainerAsProject"
import { RootState } from "../../../redux/stateTSTypes"

export function getFileDirectory(badDir: string) {
  for (var i = badDir.length; i > 0; i--) {
    if (badDir[i] === '/') {
      return badDir.slice(0, i + 1)
    }
  }
  return badDir
}

export function confirmContainerSaveName(setConfirmSaveData: (arg: any) => void, containerID: string, name: string, saveList: string[], state: RootState, onClose: () => void) {
  if (!stringIn(name, saveList)) {
    const { modules, connections } = getContainerModulesConnections(state, containerID)
    window.containerSaveService.create({
      saveName: name,
      containerID,
      modules,
      connections,
    }).then((success: string) => {
      if (success) {
        window.flashNotification('green', 'module saved to spaceDB')
      }
    })
    onClose()
  } else {
    setConfirmSaveData({ isOpen: true, message: 'module with this name already exists. would you like to update it?' })
  }
}