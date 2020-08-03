import { Range } from "../../audioModules/moduleTypes"

export function makeConnectionMenuData(isOpen: boolean, fromID = '', toID = '') {
  return {
    isOpen,
    fromID,
    toID,
  }
}

export function makeRangeSetMenuData(isOpen: boolean, modID = '', controlID = '', onChangeSubmit: (newRange: Range) => void = () => {}) {
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