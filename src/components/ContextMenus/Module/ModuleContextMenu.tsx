import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import ContextMenu, { Location } from '../ContextMenu/ContextMenu'
import DeleteButton from './ModuleDeleteButton'
import InputOutputView from './InputOutputView'
import ContainerOpenButton from './ContainerOpenButton'
import SpaceDBSaveButton from './SpaceDBSaveButton'
import { MouseDivEvent } from '../types'
import MarkContainerIO from './MarkContainerIO'
import useJSS from './style'
import FileSaveButton from './FileSaveButton'
import Conditional from '../../Conditional/Conditional'
import { getLocation } from '../ContextMenu/helpers'

declare global {
  interface Window {
    openModuleContextMenu: (event: MouseDivEvent, modID: string) => void
  }
}

function makeData(isOpen: boolean, location?: Location, modID?: string) {
  return {
    isOpen,
    location,
    modID,
  }
}

function ModuleContextMenu() {
  const [{ isOpen, location, modID }, setData] = useState(makeData(false))
  const cmRef = useRef<HTMLDivElement>(null)
  window.openModuleContextMenu = (event, modID) => {
    const newLocation = getLocation(event, cmRef)
    setData(makeData(true, newLocation, modID)) 
  }
  const onClose = () => {
    setData(makeData(false)) 
  }
  const classes = useJSS()
  const modules = useSelector((state: RootState) => state.modules)
  return (
    <Conditional showIf={isOpen}>
      <ContextMenu onClose={onClose} location={location as Location} cmRef={cmRef}>
        <div className={classes.Name}
          title='rename module'
          onClick={() => {
            window.openModuleRenameMenu(modID as string)
          }}
        >{modules[modID as string]?.name}</div>
        <ContainerOpenButton modules={modules} modID={modID as string} onClose={onClose} />
        <InputOutputView modID={modID as string} modules={modules}/>
        <SpaceDBSaveButton modules={modules} modID={modID as string} onClose={onClose} />
        <FileSaveButton modules={modules} modID={modID as string} onClose={onClose} />
        <MarkContainerIO modID={modID as string} />
        <DeleteButton modID={modID as string} onClose={onClose}/>
      </ContextMenu>
    </Conditional>
  )
}

export default ModuleContextMenu