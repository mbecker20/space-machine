import React, { Fragment } from 'react'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import ModuleContextMenu from './Module/ModuleContextMenu'
import SDBModuleContextMenu from './SpaceDB/Modules/SDBModuleContextMenu'
import SDBProjectContextMenu from './SpaceDB/Projects/SDBProjectContextMenu'

function ContextMenus() {
  return (
    <Fragment>
      <ModuleContextMenu />
      <SDBProjectContextMenu />
      <SDBModuleContextMenu />
      <ConnectionMenu />
    </Fragment>
  )
}

export default ContextMenus