import { DragEvent } from 'react'
import { ContainerModule, RootState } from '../../redux/stateTSTypes'
import { isOccupied } from '../ModuleView/helpers'
import { Dispatch } from 'redux'
import { ModuleType } from '../../audioModules/moduleTypes'
import { moveModule } from '../../redux/allActions'
import { duplicateContainer } from '../../redux/replicateContainer'
import { MOVE, COPY } from './DropSquare'

export function onDrop(e: DragEvent<HTMLDivElement>, dispatch: Dispatch, state: RootState, row: number, col: number, setHL: (isHL: boolean) => void) {
  const id = e.dataTransfer.getData('id')
  const fc = state.modules[window.fillContainerID] as ContainerModule
  const currentChildren = fc.childModules
  const possiblyMod = state.modules[id]
  const possiblyOccupyingID = isOccupied(row, col, currentChildren, state.modules)
  if (!possiblyMod) {
    if (!possiblyOccupyingID) {
      const moduleType = e.dataTransfer.getData('moduleType') as ModuleType
      const name = e.dataTransfer.getData('name')
      setHL(false)
      window.addModule(id, name, window.fillContainerID, moduleType, dispatch, row, col)
      window.setFillIsExpanded(false)
    }
  } else if (possiblyOccupyingID) {
    const fromRow = e.dataTransfer.getData('fromRow')
    const fromCol = e.dataTransfer.getData('fromCol')
    setHL(false)
    window.setFillIsExpanded(false)
    dispatch(moveModule(id, row, col))
    dispatch(moveModule(possiblyOccupyingID, Number(fromRow), Number(fromCol)))
    window.setTimeout(window.refreshArcherContainer, 1)
  } else {
    const moduleDragType = e.dataTransfer.getData('type')
    setHL(false)
    window.setFillIsExpanded(false)
    switch (moduleDragType) {
      case MOVE:
        dispatch(moveModule(id, row, col))
        break
      case COPY:
        duplicateContainer(dispatch, state, window.fillContainerID, id, row, col)
        break
    }
    window.setTimeout(window.refreshArcherContainer, 1)
  }
}