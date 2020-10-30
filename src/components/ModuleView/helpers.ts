import { CONTAINER } from "../../audioModules/moduleTypes"
import { Modules } from "../../redux/stateTSTypes"

export function getGridRange(childModules: string[], modules: Modules) {
  let maxRow = 0
  let maxCol = 0 // min col is always 0
  childModules.forEach(moduleID => {
    const mod = modules[moduleID]
    if (mod.row > maxRow) {
      maxRow = mod.row
    }
    if (mod.col > maxCol) {
      maxCol = mod.col
    }
  })
  return { maxRow, maxCol }
}

export function isOccupied(row: number, col: number, currentChildren: string[], modules: Modules) {
  for (var i = 0; i < currentChildren.length; i++) {
    const mod = modules[currentChildren[i]]
    if (mod.row === row && mod.col === col) {
      return mod.id
    }
  }
  return false
}

function onlyOneOutput(fromID: string, modules: Modules): boolean | string { // returns the string of the actual output id, or false
  if (modules[fromID].moduleType === CONTAINER) {
    if (modules[fromID].connectionOutputs.length === 1) {
      return onlyOneOutput(modules[fromID].connectionOutputs[0], modules)
    } else {
      return false
    }
  } else {
    if (modules[fromID].connectionOutputs.length === 1) {
      return fromID
    } else {
      return false
    }
  }
}

function onlyOneInput(toID: string, modules: Modules): boolean | string {
  if (modules[toID].moduleType === CONTAINER) {
    if (modules[toID].connectionInputs.length === 1) {
      return onlyOneInput(modules[toID].connectionInputs[0], modules)
    } else {
      return false
    }
  } else {
    if (modules[toID].connectionInputs.length === 1 && window.audioModules[toID].connectingParamIDs.length === 0) {
      return toID
    } else {
      return false
    }
  }
}

export function onlyOneConnectionOption(fromID: string, toID: string, modules: Modules) {
  const actualFromID = onlyOneOutput(fromID, modules)
  const actualToID = onlyOneInput(toID, modules)
  return {
    onlyOne: typeof(actualFromID) === 'string' && typeof(actualToID) === 'string',
    actualFromID,
    actualToID
  }
}