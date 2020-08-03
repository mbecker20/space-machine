import React, { useState, Fragment } from 'react'
import { makeConnectionMenuData, makeRangeSetMenuData, makeSaveMenuData, makeConfirmDeleteMenuData } from './makeData'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import RenameMenu from './RenameMenu/RenameMenu'
import RangeSetMenu from './RangeSetMenu/RangeSetMenu'
import { Range } from '../../audioModules/moduleTypes'
import SaveMenu from './SaveMenu/SaveMenu'
import ConfirmDeleteMenu from './ConfirmDeleteMenu/ConfirmDeleteMenu'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
    openRenameMenu: (toRenameID: string) => void
    openRangeSetMenu: (modID: string, controlID: string, onChangeSubmit: (newRange: Range) => void) => void
    openSaveMenu: (saveList: string[], onClose: () => void) => void
    openConfirmDeleteMenu: (saveName: string, onClose: () => void) => void
  }
}

function CenterMenus() {
  const [connectionMenuData, setConnectionMenuData] = useState(makeConnectionMenuData(false))
  window.openConnectionMenu = (fromID, toID) => { setConnectionMenuData(makeConnectionMenuData(true, fromID, toID)) }
  const [renameMenuData, setRenameMenuData] = useState({ isOpen: false, toRenameID: '' })
  window.openRenameMenu = toRenameID => { setRenameMenuData({ isOpen: true, toRenameID }) }
  const [rangeSetMenuData, setRangeSetMenuData] = useState(makeRangeSetMenuData(false))
  window.openRangeSetMenu = (modID, controlID, onChangeSubmit) => { setRangeSetMenuData(makeRangeSetMenuData(true, modID, controlID, onChangeSubmit)) }
  const [saveMenuData, setSaveMenuData] = useState(makeSaveMenuData(false))
  window.openSaveMenu = (saveList, onClose) => { setSaveMenuData({ isOpen: true, saveList, onClose }) }
  const [confirmDeleteMenuData, setConfirmDeleteMenuData] = useState(makeConfirmDeleteMenuData(false))
  window.openConfirmDeleteMenu = (saveName, onClose) => { setConfirmDeleteMenuData(makeConfirmDeleteMenuData(true, saveName, onClose)) }
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
          controlID={rangeSetMenuData.controlID}
          onClose={() => {
            setRangeSetMenuData(makeRangeSetMenuData(false))
          }}
          onChangeSubmit={newRange => {
            rangeSetMenuData.onChangeSubmit(newRange)
          }}
        />
      }
      {
        !saveMenuData.isOpen ? null :
        <SaveMenu saveList={saveMenuData.saveList} 
          onClose={() => {
            saveMenuData.onClose()
            setSaveMenuData(makeSaveMenuData(false)) 
          }}
        />
      }
      {
        !confirmDeleteMenuData.isOpen ? null :
        <ConfirmDeleteMenu saveName={confirmDeleteMenuData.saveName}
          onClose={() => {
            confirmDeleteMenuData.onClose()
            setConfirmDeleteMenuData(makeConfirmDeleteMenuData(false))
          }}
        />
      }
    </Fragment>
  )
}

export default CenterMenus