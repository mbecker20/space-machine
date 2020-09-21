import React, { Fragment, MouseEvent, useState } from 'react'
import { makeModuleCMData } from './makeData'
import ModuleContextMenu from './Module/ModuleContextMenu'

declare global {
  interface Window {
    openModuleContextMenu: (event: MouseEvent<HTMLDivElement>, modID: string) => void
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
          modID={moduleCMData.modID as string}
        />
      }
    </Fragment>
  )
}

export default ContextMenus