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