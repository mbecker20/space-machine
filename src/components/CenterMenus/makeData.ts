import { Range } from "../../audioModules/moduleTypes"

export function makeConnectionMenuData(isOpen: boolean, fromID = '', toID = '') {
  return {
    isOpen,
    fromID,
    toID,
  }
}

export function makeKnobRangeSetMenuData(isOpen: boolean, modID = '', controlID = '', onChangeSubmit: (newRange: Range) => void = () => {}) {
  return {
    isOpen,
    modID,
    controlID,
    onChangeSubmit,
  }
}

export function makeSaveMenuData(isOpen: boolean, saveList: string[] = [], onClose = () => {}) {
  return {
    isOpen,
    saveList,
    onClose,
  }
}

export function makeContainerSaveMenuData(isOpen: boolean, id = '', saveList: string[] = [], onClose = () => { }) {
  return {
    isOpen,
    id,
    saveList,
    onClose,
  }
}

export function makeConfirmDeleteMenuData(isOpen: boolean, saveName = '', onClose = () => {}) {
  return {
    isOpen,
    saveName,
    onClose
  }
}