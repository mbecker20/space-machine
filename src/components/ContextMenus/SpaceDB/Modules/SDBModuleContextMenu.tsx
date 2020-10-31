import React, { useState } from 'react'
import { zIndex } from '../../../../theme/zIndex'
import ContextMenu from '../../ContextMenu/ContextMenu'
import { MouseDivEvent } from '../../types'
import ModuleDeleteButton from './ModuleDeleteButton'

declare global {
  interface Window {
    openSDBModuleContextMenu: (event: MouseDivEvent, saveName: string) => void
  }
}

function makeData(isOpen: boolean, event?: MouseDivEvent, saveName?: string) {
  return {
    isOpen,
    event,
    saveName
  }
}

function SDBModuleContextMenu() {
  const [{ isOpen, event, saveName }, setData] = useState(makeData(false))
  window.openSDBModuleContextMenu = (event, saveName) => {
    setData(makeData(true, event, saveName)) 
  }
  const onClose = () => setData(makeData(false))
  return (
    <ContextMenu event={event as MouseDivEvent}
      onClose={() => setData(makeData(false))}
      bounderStyle={{ zIndex: zIndex.centerMenu + 1 }}
      isOpen={isOpen}
    >
      <ModuleDeleteButton saveName={saveName as string} onClose={onClose}/>
    </ContextMenu>
  )
}

export default SDBModuleContextMenu