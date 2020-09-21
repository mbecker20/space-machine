import React, { MouseEvent } from 'react'
import { Module } from '../../../redux/stateTSTypes'
import ContextMenu from '../ContextMenu/ContextMenu'
import ContextMenuItem from '../ContextMenu/ContextMenuItem'
import DeleteButton from './DeleteButton'

interface Props {
  event: MouseEvent<HTMLDivElement>
  onClose: () => void
  selectedModule: Module
}

function ModuleContextMenu({ event, onClose, selectedModule }: Props) {
  return (
    <ContextMenu e={event} onClose={onClose}>
      <DeleteButton selectedModule={selectedModule} />
    </ContextMenu>
  )
}

export default ModuleContextMenu