import { DragEvent } from 'react'
import { ContainerModule, RootState } from '../../redux/stateTSTypes'
import { isOccupied } from '../ModuleView/helpers'
import { Dispatch } from 'redux'
import { ModuleType, CONTAINER } from '../../audioModules/moduleTypes'
import { moveModule } from '../../redux/allActions'
import { duplicateContainer, performContainerMerge } from '../../redux/replicateContainer'
import { MOVE, COPY } from './DropSquare'
import { ADD_MODULE } from '../../redux/modules/moduleActionTypes'
import { CONTAINER_RESTORE } from '../RightDrawer/ContainerDrawerItem'
import duplicateModule from '../../redux/replicateModule'

export function onDrop(e: DragEvent<HTMLDivElement>, dispatch: Dispatch, state: RootState, row: number, col: number, setHL: (isHL: boolean) => void) {
  const id = e.dataTransfer.getData('id')
  const fc = state.modules[window.fillContainerID] as ContainerModule
  const currentChildren = fc.childModules
  const possiblyMod = state.modules[id]
  const possiblyOccupyingID = isOccupied(row, col, currentChildren, state.modules)
  if (!possiblyMod) {
    if (!possiblyOccupyingID) {
      const dropType = e.dataTransfer.getData('type')
      const name = e.dataTransfer.getData('name')
      switch(dropType) {
        case ADD_MODULE:
          const moduleType = e.dataTransfer.getData('moduleType') as ModuleType
          window.addModule(id, name, window.fillContainerID, moduleType, dispatch, row, col)
          break
        case CONTAINER_RESTORE:
          const totNumberModules = Object.keys(state.modules).length
          const totNumberConnections = Object.keys(state.connections).length
          window.containerSaveService.get(name).then(({ containerID, modules, connections }: any) => {
            performContainerMerge(dispatch, modules, connections, totNumberModules, totNumberConnections, window.fillContainerID, containerID, row, col)
          })
          break
      }
      setHL(false)
    }
  } else if (possiblyOccupyingID) {
    const fromRow = e.dataTransfer.getData('fromRow')
    const fromCol = e.dataTransfer.getData('fromCol')
    setHL(false)
    dispatch(moveModule(id, row, col))
    dispatch(moveModule(possiblyOccupyingID, Number(fromRow), Number(fromCol)))
    window.setTimeout(window.refreshArcherContainer, 1)
  } else {
    const moduleDragType = e.dataTransfer.getData('type')
    setHL(false)
    switch (moduleDragType) {
      case MOVE:
        dispatch(moveModule(id, row, col))
        break
      case COPY:
        if (state.modules[id].moduleType === CONTAINER) {
          duplicateContainer(dispatch, state, window.fillContainerID, id, row, col)
        } else {
          duplicateModule(dispatch, state, id, row, col)
        }
        break
    }
    window.setTimeout(window.refreshArcherContainer, 1)
  }
}