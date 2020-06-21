import { Module } from "../../state/stateTSTypes";

export function getMaxRow(mod: Module) {
  let maxRow = 0
  mod.children.columns.forEach(col => {
    if (col.length > maxRow) {
      maxRow = col.length
    }
  })
  return maxRow
}