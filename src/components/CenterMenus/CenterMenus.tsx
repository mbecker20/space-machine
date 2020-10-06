import React, { Fragment } from 'react'
import ConnectionMenu from './ConnectionMenu/ConnectionMenuOld'
import KnobRangeSetMenu from './RangeSetMenu/KnobRangeSetMenu'
import SpaceDBProjectSaveMenu from './SaveMenu/SpaceDBProjectSaveMenu'
import ConfirmDeleteMenu from './ConfirmDeleteMenu/ConfirmDeleteMenu'
import FileSaveMenu from './SaveMenu/FileSaveMenu'
import SpaceDBContainerSaveMenu from './SaveMenu/SpaceDBContainerSaveMenu'
import AnalyzerRangeSetMenu from './RangeSetMenu/AnalyzerRangeSetMenu'
import RenameModuleMenu from './RenameMenu/RenameModuleMenu'
import RenameControlMenu from './RenameMenu/RenameControlMenu'
import AddModuleMenu from './AddModuleMenu/AddModuleMenu'

function CenterMenus() {
          
  return (
    <Fragment>
      <AddModuleMenu/>
      <ConnectionMenu/>
      <RenameModuleMenu/>
      <RenameControlMenu/>
      <KnobRangeSetMenu/>
      <AnalyzerRangeSetMenu/>
      <SpaceDBProjectSaveMenu/>
      <SpaceDBContainerSaveMenu/>
      <ConfirmDeleteMenu/>
      <FileSaveMenu/>
    </Fragment>
  )
}

export default CenterMenus