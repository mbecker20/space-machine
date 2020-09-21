import React, { Fragment, MouseEvent, useState } from 'react'
import { Module } from '../../redux/stateTSTypes'
import { makeModuleCMData } from './makeData'
import ModuleContextMenu from './Module/ModuleContextMenu'

declare global {
  interface Window {
    openModuleContextMenu: (event: MouseEvent<HTMLDivElement>, selectedModule: Module) => void
  }
}

function ContextMenus() {
  const [moduleCMData, setModuleCMData] = useState(makeModuleCMData(false))
  window.openModuleContextMenu = (event, selectedModule) => { setModuleCMData(makeModuleCMData(true, event, selectedModule)) }
  return (
    <Fragment>
      {!moduleCMData.isOpen ? null :
        <ModuleContextMenu event={moduleCMData.event as MouseEvent<HTMLDivElement>} 
          onClose={() => { setModuleCMData(makeModuleCMData(false)) }}
          selectedModule={moduleCMData.selectedModule as Module}
        />
      }
    </Fragment>
  )
}

export default ContextMenus