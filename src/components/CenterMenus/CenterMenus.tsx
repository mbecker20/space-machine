import React, { useState, Fragment } from 'react'
import { makeConnectionMenuData, makeRangeSetMenuData, makeSaveMenuData, makeConfirmDeleteMenuData, makeContainerSaveMenuData } from './makeData'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import RenameMenu from './RenameMenu/RenameMenu'
import RangeSetMenu from './RangeSetMenu/RangeSetMenu'
import { Range } from '../../audioModules/moduleTypes'
import SpaceDBProjectSaveMenu from './SaveMenu/SpaceDBProjectSaveMenu'
import ConfirmDeleteMenu from './ConfirmDeleteMenu/ConfirmDeleteMenu'
import FileSaveMenu from './SaveMenu/FileSaveMenu'
import SpaceDBContainerSaveMenu from './SaveMenu/SpaceDBContainerSaveMenu'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
    openRenameMenu: (toRenameID: string) => void
    openRangeSetMenu: (modID: string, controlID: string, onChangeSubmit: (newRange: Range) => void) => void
    openSpaceDBProjectSaveMenu: (saveList: string[], onClose: () => void) => void
    openSpaceDBContainerSaveMenu: (saveList: string[], id: string, onClose: () => void) => void
    openConfirmDeleteMenu: (saveName: string, onClose: () => void) => void
    openFileSaveMenu: () => void
  }
}

function CenterMenus() {

  const [connectionMenuData, setConnectionMenuData] = useState(makeConnectionMenuData(false))
  window.openConnectionMenu = (fromID, toID) => { setConnectionMenuData(makeConnectionMenuData(true, fromID, toID)) }
  
  const [renameMenuData, setRenameMenuData] = useState({ isOpen: false, toRenameID: '' })
  window.openRenameMenu = toRenameID => { setRenameMenuData({ isOpen: true, toRenameID }) }
  
  const [rangeSetMenuData, setRangeSetMenuData] = useState(makeRangeSetMenuData(false))
  window.openRangeSetMenu = (modID, controlID, onChangeSubmit) => { setRangeSetMenuData(makeRangeSetMenuData(true, modID, controlID, onChangeSubmit)) }
  
  const [spaceDBProjectSaveMenuData, setSpaceDBProjectSaveMenuData] = useState(makeSaveMenuData(false))
  window.openSpaceDBProjectSaveMenu = (saveList, onClose) => { setSpaceDBProjectSaveMenuData(makeSaveMenuData(true, saveList, onClose)) }

  const [spaceDBContainerSaveMenuData, setSpaceDBContainerSaveMenuData] = useState(makeContainerSaveMenuData(false))
  window.openSpaceDBContainerSaveMenu = (saveList, id, onClose) => { setSpaceDBContainerSaveMenuData(makeContainerSaveMenuData(true, id, saveList, onClose)) }
  
  const [confirmDeleteMenuData, setConfirmDeleteMenuData] = useState(makeConfirmDeleteMenuData(false))
  window.openConfirmDeleteMenu = (saveName, onClose) => { setConfirmDeleteMenuData(makeConfirmDeleteMenuData(true, saveName, onClose)) }
  
  const [fileSaveMenuData, setFileSaveMenuData] = useState({ isOpen: false })
  window.openFileSaveMenu = () => { setFileSaveMenuData({ isOpen: true }) }
  
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
        !spaceDBProjectSaveMenuData.isOpen ? null :
        <SpaceDBProjectSaveMenu saveList={spaceDBProjectSaveMenuData.saveList} 
          onClose={() => {
            spaceDBProjectSaveMenuData.onClose()
            setSpaceDBProjectSaveMenuData(makeSaveMenuData(false)) 
          }}
        />
      }
      {
        !spaceDBContainerSaveMenuData.isOpen ? null :
        <SpaceDBContainerSaveMenu id={spaceDBContainerSaveMenuData.id}
          saveList={spaceDBContainerSaveMenuData.saveList}
          onClose={() => {
            spaceDBContainerSaveMenuData.onClose()
            setSpaceDBContainerSaveMenuData(makeContainerSaveMenuData(false))
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
      {
        !fileSaveMenuData.isOpen ? null :
        <FileSaveMenu
          onClose={() => {
            setFileSaveMenuData({ isOpen: false })
          }}
        />
      }
    </Fragment>
  )
}

export default CenterMenus