import React, { useState, Fragment } from 'react'
import { makeConnectionMenuData } from './makeData'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import RenameMenu from './RenameMenu/RenameMenu'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
    openRenameMenu: (toRenameID: string) => void
    openRangeSetMenu: () => void
  }
}

function CenterMenus() {
  const [connectionMenuData, setConnectionMenuData] = useState(makeConnectionMenuData(false))
  window.openConnectionMenu = (fromID, toID) => { setConnectionMenuData(makeConnectionMenuData(true, fromID, toID)) }
  const [renameMenuData, setRenameMenuData] = useState({ isOpen: false, toRenameID: '' })
  window.openRenameMenu = toRenameID => { setRenameMenuData({ isOpen: true, toRenameID }) }
  return (
    <Fragment>
      {
        !connectionMenuData.isOpen ? null :
          <ConnectionMenu fromID={connectionMenuData.fromID} toID={connectionMenuData.toID}
            onClose={() => {
              setConnectionMenuData(makeConnectionMenuData(false))
            }}
          />
      }
      {
        !renameMenuData.isOpen ? null :
          <RenameMenu toRenameID={renameMenuData.toRenameID} onClose={() => { setRenameMenuData({ isOpen: false, toRenameID: '' }) }} />
      }
    </Fragment>
  )
}

export default CenterMenus