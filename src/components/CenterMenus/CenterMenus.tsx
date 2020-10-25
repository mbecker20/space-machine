import React, { Fragment } from 'react'
import ConnectionMenu from './ConnectionMenu/ConnectionMenu'
import KnobRangeSetMenu from './RangeSetMenu/KnobRangeSetMenu'
import SpaceDBProjectSaveMenu from './SaveMenu/SpaceDBProjectSaveMenu'
import ConfirmDeleteMenu from './ConfirmDeleteMenu/ConfirmDeleteMenu'
import FileContainerSaveMenu from './SaveMenu/FileContainerSaveMenu'
import SpaceDBContainerSaveMenu from './SaveMenu/SpaceDBContainerSaveMenu'
import AnalyzerRangeSetMenu from './RangeSetMenu/AnalyzerRangeSetMenu'
import RenameModuleMenu from './RenameMenu/RenameModuleMenu'
import RenameControlMenu from './RenameMenu/RenameControlMenu'
import AddModuleMenu from './AddModuleMenu/AddModuleMenu'
import ConfirmBlankProject from '../RightDrawer/FileMenu/ConfirmBlankProject'

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
      <FileContainerSaveMenu/>
      <ConfirmBlankProject/>
    </Fragment>
  )
}

export default CenterMenus