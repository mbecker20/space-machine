import React, { Fragment, useState } from 'react'
import { makeSDBProjectCMData } from './makeData'
import ModuleContextMenu from './Module/ModuleContextMenu'
import SDBProjectContextMenu from './SpaceDB/Projects/SDBProjectContextMenu'
import { MouseDivEvent } from './types'

declare global {
  interface Window {
    openSDBProjectContextMenu: (
      event: MouseDivEvent, 
      saveName: string, 
      setSaveList: (arg: string[]) => void
    ) => void
  }
}

function ContextMenus() {
  const [sdbProjectCMData, setSDBProjectCMData] = useState(makeSDBProjectCMData(false))
  window.openSDBProjectContextMenu = (event, saveName, setSaveList) => {
    setSDBProjectCMData(makeSDBProjectCMData(true, event, saveName, setSaveList))
  }
  return (
    <Fragment>
      <ModuleContextMenu/>
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