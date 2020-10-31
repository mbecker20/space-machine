import React, { useState } from 'react'
import ContextMenu from '../../ContextMenu/ContextMenu'
import { MouseDivEvent } from '../../types'
import ProjectDeleteButton from './ProjectDeleteButton'

type SetSaveList = (arg: string[]) => void

declare global {
  interface Window {
    openSDBProjectContextMenu: (
      event: MouseDivEvent,
      saveName: string,
      setSaveList: SetSaveList
    ) => void
  }
}

export function makeData(
  isOpen: boolean,
  event?: MouseDivEvent,
  saveName?: string,
  setSaveList?: (arg: string[]) => void
) {
  return {
    isOpen,
    event,
    saveName,
    setSaveList
  }
}

function SDBProjectContextMenu() {
  const [{ isOpen, event, saveName, setSaveList }, setData] = useState(makeData(false))
  window.openSDBProjectContextMenu = (event, saveName, setSaveList) => {
    setData(makeData(true, event, saveName, setSaveList)) 
  }
  const onClose = () => { setData(makeData(false)) }
  return (
    <ContextMenu event={event as MouseDivEvent} onClose={onClose} isOpen={isOpen}>
      <ProjectDeleteButton saveName={saveName as string} setSaveList={setSaveList as SetSaveList} onClose={onClose} />
    </ContextMenu>
  )
}

export default SDBProjectContextMenu