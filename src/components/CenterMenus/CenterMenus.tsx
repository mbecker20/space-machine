import React, { useState, Fragment } from 'react'
import { makeConnectionMenuData, makeKnobRangeSetMenuData, makeSaveMenuData, makeConfirmDeleteMenuData, makeContainerSaveMenuData, makeAnalyzerRangeSetMenuData } from './makeData'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import RenameMenu from './RenameMenu/RenameMenu'
import KnobRangeSetMenu from './RangeSetMenu/KnobRangeSetMenu'
import { Range } from '../../audioModules/moduleTypes'
import SpaceDBProjectSaveMenu from './SaveMenu/SpaceDBProjectSaveMenu'
import ConfirmDeleteMenu from './ConfirmDeleteMenu/ConfirmDeleteMenu'
import FileSaveMenu from './SaveMenu/FileSaveMenu'
import SpaceDBContainerSaveMenu from './SaveMenu/SpaceDBContainerSaveMenu'
import AnalyzerRangeSetMenu from './RangeSetMenu/AnalyzerRangeSetMenu'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
    openRenameMenu: (toRenameID: string) => void
    openKnobRangeSetMenu: (modID: string, controlID: string, onChangeSubmit: (newRange: Range) => void) => void
    openAnalyzerRangeSetMenu: (range: Range, onChangeSubmit: (newRange: Range) => void) => void
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
  
  const [knobRangeSetMenuData, setKnobRangeSetMenuData] = useState(makeKnobRangeSetMenuData(false))
  window.openKnobRangeSetMenu = (modID, controlID, onChangeSubmit) => { setKnobRangeSetMenuData(makeKnobRangeSetMenuData(true, modID, controlID, onChangeSubmit)) }

  const [analyzerRangeSetMenuData, setAnalyzerRangeSetMenuData] = useState(makeAnalyzerRangeSetMenuData(false))
  window.openAnalyzerRangeSetMenu = (range, onChangeSubmit) => { setAnalyzerRangeSetMenuData(makeAnalyzerRangeSetMenuData(true, range, onChangeSubmit)) }
  
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
        !knobRangeSetMenuData.isOpen ? null :
        <KnobRangeSetMenu modID={knobRangeSetMenuData.modID} 
          controlID={knobRangeSetMenuData.controlID}
          onClose={() => {
            setKnobRangeSetMenuData(makeKnobRangeSetMenuData(false))
          }}
          onChangeSubmit={newRange => {
            knobRangeSetMenuData.onChangeSubmit(newRange)
          }}
        />
      }
      {
        !analyzerRangeSetMenuData.isOpen ? null :
        <AnalyzerRangeSetMenu range={analyzerRangeSetMenuData.range}
          onClose={() => {
            setAnalyzerRangeSetMenuData(makeAnalyzerRangeSetMenuData(false))
          }}
          onChangeSubmit={newRange => {
            analyzerRangeSetMenuData.onChangeSubmit(newRange)
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