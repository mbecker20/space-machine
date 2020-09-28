import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { renameModule } from '../../../redux/allActions'
import RenameMenu from './RenameMenu'

declare global {
  interface Window {
    openModuleRenameMenu: (toRenameID: string) => void
  }
}

function makeData(isOpen: boolean, toRenameID = '') {
  return {
    isOpen,
    toRenameID,
  }
}

function RenameModuleMenu() {
  const [{ isOpen, toRenameID }, setData] = useState(makeData(false))
  window.openModuleRenameMenu = toRenameID => { setData(makeData(true, toRenameID)) }
  const onClose = () => { setData(makeData(false)) }
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  return (
    <RenameMenu header='rename module' 
      isOpen={isOpen}
      onSubmit={newName => {
        dispatch(renameModule(toRenameID, newName))
      }}
      placeholder={modules[toRenameID]?.name}
      initName={''}
      onClose={onClose}
    />
  )
}

export default RenameModuleMenu