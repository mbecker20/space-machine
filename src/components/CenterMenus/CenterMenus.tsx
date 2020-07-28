import React, { useState, Fragment } from 'react'
import { makeConnectionMenuData, makeRangeSetMenuData } from './makeData'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import RenameMenu from './RenameMenu/RenameMenu'
import RangeSetMenu from './RangeSetMenu/RangeSetMenu'
import { Range } from '../../audioModules/moduleTypes'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
    openRenameMenu: (toRenameID: string) => void
    openRangeSetMenu: (modID: string, dataKey: string, onChangeSubmit: (newRange: Range) => void) => void
  }
}

function CenterMenus() {
  const [connectionMenuData, setConnectionMenuData] = useState(makeConnectionMenuData(false))
  window.openConnectionMenu = (fromID, toID) => { setConnectionMenuData(makeConnectionMenuData(true, fromID, toID)) }
  const [renameMenuData, setRenameMenuData] = useState({ isOpen: false, toRenameID: '' })
  window.openRenameMenu = toRenameID => { setRenameMenuData({ isOpen: true, toRenameID }) }
  const [rangeSetMenuData, setRangeSetMenuData] = useState(makeRangeSetMenuData(false))
  window.openRangeSetMenu = (modID, dataKey, onChangeSubmit) => { setRangeSetMenuData(makeRangeSetMenuData(true, modID, dataKey, onChangeSubmit)) }
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
      {
        !rangeSetMenuData.isOpen ? null :
        <RangeSetMenu modID={rangeSetMenuData.modID} 
          dataKey={rangeSetMenuData.dataKey}
          onClose={() => {
            setRangeSetMenuData(makeRangeSetMenuData(false))
          }}
          onChangeSubmit={newRange => {
            rangeSetMenuData.onChangeSubmit(newRange)
          }}
        />
      }
    </Fragment>
  )
}

export default CenterMenus