import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import ContextMenu from '../ContextMenu/ContextMenu'
import DeleteButton from './ModuleDeleteButton'
import InputOutputView from './InputOutputView'
import { ContextMenuBaseProps } from '../types'

interface Props extends ContextMenuBaseProps {
  modID: string
}

function ModuleContextMenu({ event, onClose, modID }: Props) {
  const modules = useSelector((state: RootState) => state.modules)
  return (
    <ContextMenu event={event} onClose={onClose}>
      <InputOutputView modID={modID} modules={modules}/>
      <DeleteButton modID={modID} onClose={onClose}/>
    </ContextMenu>
  )
}

export default ModuleContextMenu