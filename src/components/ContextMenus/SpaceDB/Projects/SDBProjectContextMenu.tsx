import React from 'react'
import ContextMenu from '../../ContextMenu/ContextMenu'
import { ContextMenuBaseProps } from '../../types'
import ProjectDeleteButton from './ProjectDeleteButton'

interface Props extends ContextMenuBaseProps {
  saveName: string
  setSaveList: (arg: string[]) => void
}

function SDBProjectContextMenu({ event, onClose, saveName, setSaveList }: Props) {
  return (
    <ContextMenu event={event} onClose={onClose}>
      <ProjectDeleteButton saveName={saveName} setSaveList={setSaveList} onClose={onClose} />
    </ContextMenu>
  )
}

export default SDBProjectContextMenu