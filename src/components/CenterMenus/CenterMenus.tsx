import React, { useState, Fragment, useRef } from 'react'
import { makeConnectionMenuData, makeKnobRangeSetMenuData, makeSaveMenuData, makeConfirmDeleteMenuData, makeContainerSaveMenuData, makeAnalyzerRangeSetMenuData, makeRenameControlMenuData, makeAddModuleMenuData } from './makeData'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import KnobRangeSetMenu from './RangeSetMenu/KnobRangeSetMenu'
import { Range } from '../../audioModules/moduleTypes'
import SpaceDBProjectSaveMenu from './SaveMenu/SpaceDBProjectSaveMenu'
import ConfirmDeleteMenu from './ConfirmDeleteMenu/ConfirmDeleteMenu'
import FileSaveMenu from './SaveMenu/FileSaveMenu'
import SpaceDBContainerSaveMenu from './SaveMenu/SpaceDBContainerSaveMenu'
import AnalyzerRangeSetMenu from './RangeSetMenu/AnalyzerRangeSetMenu'
import { ContainerControl } from '../../redux/stateTSTypes'
import RenameModuleMenu from './RenameMenu/RenameModuleMenu'
import RenameControlMenu from './RenameMenu/RenameControlMenu'
import AddModuleMenu from './AddModuleMenu/AddModuleMenu'

declare global {
  interface Window {
    openAddModuleMenu: (row: number, col: number) => void
    openConnectionMenu: (fromID: string, toID: string) => void
    openModuleRenameMenu: (toRenameID: string) => void
    openControlRenameMenu: (placeholder: string, parentModID: string, containerControl: ContainerControl) => void
    openKnobRangeSetMenu: (modID: string, controlID: string, onChangeSubmit: (newRange: Range) => void) => void
    openAnalyzerRangeSetMenu: (range: Range, onChangeSubmit: (newRange: Range) => void) => void
    openSpaceDBProjectSaveMenu: (saveList: string[], onClose: () => void) => void
    openSpaceDBContainerSaveMenu: (saveList: string[], id: string, onClose: () => void) => void
    openConfirmDeleteMenu: (saveName: string, onClose: () => void) => void
    openFileSaveMenu: () => void
  }
}

function CenterMenus() {
  const addModuleSearchRef = useRef<HTMLInputElement>(null)
  const [addModuleMenuData, setAddModuleMenuData] = useState(makeAddModuleMenuData(false))
  window.openAddModuleMenu = (row, col) => { 
    setAddModuleMenuData(makeAddModuleMenuData(true, row, col))
    if (addModuleSearchRef.current) addModuleSearchRef.current.focus()
  }

  const [connectionMenuData, setConnectionMenuData] = useState(makeConnectionMenuData(false))
  window.openConnectionMenu = (fromID, toID) => { setConnectionMenuData(makeConnectionMenuData(true, fromID, toID)) }
  
  const [renameModuleMenuData, setRenameModuleMenuData] = useState({ isOpen: false, toRenameID: '' })
  window.openModuleRenameMenu = toRenameID => { setRenameModuleMenuData({ isOpen: true, toRenameID }) }

  const [renameControlMenuData, setRenameControlMenuData] = useState(makeRenameControlMenuData(false))
  window.openControlRenameMenu = (placeholder, parentModID, containerControl) => { setRenameControlMenuData(makeRenameControlMenuData(true, placeholder, parentModID, containerControl)) }

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
      <AddModuleMenu
        isOpen={addModuleMenuData.isOpen}
        onClose={() => {
          setAddModuleMenuData(makeAddModuleMenuData(false))
        }}
        row={addModuleMenuData.row as number}
        col={addModuleMenuData.col as number}
        searchRef={addModuleSearchRef}
      />
      {
        !connectionMenuData.isOpen ? null :
        <ConnectionMenu fromID={connectionMenuData.fromID} toID={connectionMenuData.toID}
          onClose={() => {
            setConnectionMenuData(makeConnectionMenuData(false))
          }}
        />
      }
      {
        !renameModuleMenuData.isOpen ? null :
        <RenameModuleMenu toRenameID={renameModuleMenuData.toRenameID} 
          onClose={() => { 
            setRenameModuleMenuData({ isOpen: false, toRenameID: '' }) 
          }} 
        />
      }
      {
        !renameControlMenuData.isOpen ? null :
        <RenameControlMenu placeholder={renameControlMenuData.placeholder} 
          containerControl={renameControlMenuData.containerControl as ContainerControl}
          parentModID={renameControlMenuData.parentModID}
          onClose={() => {
            setRenameControlMenuData(makeRenameControlMenuData(false))
          }}
        />
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