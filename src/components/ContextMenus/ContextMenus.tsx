import React, { Fragment, useState } from 'react'
import { makeModuleCMData, makeSDBProjectCMData } from './makeData'
import ModuleContextMenu from './Module/ModuleContextMenu'
import SDBProjectContextMenu from './SpaceDB/Projects/SDBProjectContextMenu'
import { MouseDivEvent } from './types'

declare global {
  interface Window {
    openModuleContextMenu: (event: MouseDivEvent, modID: string) => void
    openSDBProjectContextMenu: (
      event: MouseDivEvent, 
      saveName: string, 
      setSaveList: (arg: string[]) => void
    ) => void
  }
}

function ContextMenus() {
  const [moduleCMData, setModuleCMData] = useState(makeModuleCMData(false))
  window.openModuleContextMenu = (event, selectedModule) => { 
    setModuleCMData(makeModuleCMData(true, event, selectedModule)) 
  }
  const [sdbProjectCMData, setSDBProjectCMData] = useState(makeSDBProjectCMData(false))
  window.openSDBProjectContextMenu = (event, saveName, setSaveList) => {
    setSDBProjectCMData(makeSDBProjectCMData(true, event, saveName, setSaveList))
  }
  return (
    <Fragment>
      {!moduleCMData.isOpen ? null :
        <ModuleContextMenu event={moduleCMData.event as MouseDivEvent} 
          onClose={() => { setModuleCMData(makeModuleCMData(false)) }}
          modID={moduleCMData.modID as string}
        />
      }
      {!sdbProjectCMData.isOpen ? null :
        <SDBProjectContextMenu event={sdbProjectCMData.event as MouseDivEvent}
          onClose={() => { setSDBProjectCMData(makeSDBProjectCMData(false)) }}
          saveName={sdbProjectCMData.saveName as string}
          setSaveList={sdbProjectCMData.setSaveList as (arg: string[]) => void}
        />
      }
    </Fragment>
  )
}

export default ContextMenus