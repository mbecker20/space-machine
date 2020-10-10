import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import ContextMenu from '../ContextMenu/ContextMenu'
import DeleteButton from './ModuleDeleteButton'
import InputOutputView from './InputOutputView'
import ContainerOpenButton from './ContainerOpenButton'
import ContainerSaveButton from './ContainerSaveButton'
import { MouseDivEvent } from '../types'
import MarkContainerIO from './MarkContainerIO'

declare global {
  interface Window {
    openModuleContextMenu: (event: MouseDivEvent, modID: string) => void
  }
}

function makeData(isOpen: boolean, event?: MouseDivEvent, modID?: string) {
  return {
    isOpen,
    event,
    modID,
  }
}

function ModuleContextMenu() {
  const modules = useSelector((state: RootState) => state.modules)
  const [{ isOpen, event, modID }, setData] = useState(makeData(false))
  window.openModuleContextMenu = (event, modID) => setData(makeData(true, event, modID))
  const onClose = () => { setData(makeData(false)) }
  return (
    <Fragment>
      {!isOpen ? null :
        <ContextMenu event={event as MouseDivEvent} onClose={onClose}>
          <div>{modules[modID as string]?.name}</div>
          <ContainerOpenButton modules={modules} modID={modID as string} onClose={onClose} />
          <InputOutputView modID={modID as string} modules={modules}/>
          <ContainerSaveButton modules={modules} modID={modID as string} onClose={onClose} />
          <MarkContainerIO modID={modID as string} />
          <DeleteButton modID={modID as string} onClose={onClose}/>
        </ContextMenu>
      }
    </Fragment>
  )
}

export default ModuleContextMenu