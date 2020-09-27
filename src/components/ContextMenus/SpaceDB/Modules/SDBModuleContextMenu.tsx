import React, { Fragment, useState } from 'react'
import ContextMenu from '../../ContextMenu/ContextMenu'
import { MouseDivEvent } from '../../types'

declare global {
  interface Window {
    openSDBModuleContextMenu: (event: MouseDivEvent) => void
  }
}

function makeData(isOpen: boolean, event?: MouseDivEvent) {
  return {
    isOpen,
    event,
  }
}

function SDBModuleContextMenu() {
  const [{ isOpen, event }, setData] = useState(makeData(false))
  return (
    <Fragment>
      {!isOpen ? null :
        <ContextMenu event={event as MouseDivEvent} 
          onClose={() => setData(makeData(false))}
        >

        </ContextMenu>
      }
    </Fragment>
  )
}

export default SDBModuleContextMenu