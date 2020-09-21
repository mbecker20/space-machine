import React, { MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import ContextMenu from '../ContextMenu/ContextMenu'
import DeleteButton from './DeleteButton'
import InputOutputView from './InputOutputView'

interface Props {
  event: MouseEvent<HTMLDivElement>
  onClose: () => void
  modID: string
}

function ModuleContextMenu({ event, onClose, modID }: Props) {
  const modules = useSelector((state: RootState) => state.modules)
  return (
    <ContextMenu e={event} onClose={onClose}>
      <InputOutputView modID={modID} modules={modules}/>
      <DeleteButton modID={modID} onClose={onClose}/>
    </ContextMenu>
  )
}

export default ModuleContextMenu