import { Range } from "../../audioModules/moduleTypes"
import { ContainerControl } from "../../redux/stateTSTypes"

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

export function makeAnalyzerRangeSetMenuData(isOpen: boolean, range: Range = [0, 0], onChangeSubmit: (newRange: Range) => void = () => { }) {
  return {
    isOpen,
    range,
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

export function makeRenameControlMenuData(isOpen: boolean, placeholder = '', parentModID = '', containerControl?: ContainerControl) {
  return {
    isOpen,
    placeholder,
    containerControl,
    parentModID
  }
}