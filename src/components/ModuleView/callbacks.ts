import { DragEvent } from 'react'
import { Modules, Module } from '../../redux/stateTSTypes'
import { MOVE, COPY } from '../DropSquare/DropSquare'
import { Dispatch } from 'redux'
import { moveModule } from '../../redux/allActions'

export function iconOnDrop(
  e: DragEvent<HTMLDivElement>,
  modules: Modules,
  mod: Module,
  dispatch: Dispatch,
) {
  e.stopPropagation()
  const id = e.dataTransfer.getData('id')
  const moduleDragType = e.dataTransfer.getData('type')
  if (id) {
    const possiblyMod = modules[id]
    if (possiblyMod && moduleDragType === MOVE) {
      const fromRow = e.dataTransfer.getData('fromRow')
      const fromCol = e.dataTransfer.getData('fromCol')
      dispatch(moveModule(id, mod.row, mod.col))
      dispatch(moveModule(mod.id, Number(fromRow), Number(fromCol)))
      window.setTimeout(window.refreshArcherContainer, 100)
    }
  } else {
    if (mod.connectionInputs.length === 0 && window.audioModules[mod.id].connectingParamIDs.length === 0) {
      alert('mod cannot accept input')
    } else {
      const fromID = e.dataTransfer.getData('fromID')
      if (fromID) {
        window.openConnectionMenu(fromID, mod.id)
      }
    }
  }
}

export function iconOnDragStart(
  e: DragEvent<HTMLDivElement>,
  mod: Module
) {
  if (e.shiftKey) {
    e.dataTransfer.setData('type', COPY)
  } else {
    e.dataTransfer.setData('type', MOVE)
  }
  e.dataTransfer.setData('id', mod.id)
  e.dataTransfer.setData('fromRow', `${mod.row}`)
  e.dataTransfer.setData('fromCol', `${mod.col}`)
}