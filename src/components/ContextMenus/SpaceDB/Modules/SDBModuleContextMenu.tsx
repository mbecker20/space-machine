import React, { Fragment, useState } from 'react'
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
  window.openSDBModuleContextMenu = (event, saveName) => { setData(makeData(true, event, saveName)) }
  const onClose = () => setData(makeData(false))
  return (
    <Fragment>
      {!isOpen ? null :
        <ContextMenu event={event as MouseDivEvent} 
          onClose={() => setData(makeData(false))}
        >
          <ModuleDeleteButton saveName={saveName as string} onClose={onClose}/>
        </ContextMenu>
      }
    </Fragment>
  )
}

export default SDBModuleContextMenu