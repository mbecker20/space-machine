import React, { useState } from 'react'
import RenameMenu from './RenameMenu'
import { useDispatch } from 'react-redux'
import { renameContainerControl } from '../../../redux/allActions'
import { ContainerControl } from '../../../redux/stateTSTypes'

declare global {
  interface Window {
    openControlRenameMenu: (placeholder: string, parentModID: string, containerControl: ContainerControl) => void
  }
}

function makeData(isOpen: boolean, placeholder = '', parentModID = '', containerControl?: ContainerControl) {
  return {
    isOpen,
    placeholder,
    containerControl,
    parentModID
  }
}

function RenameControlMenu() {
  const [{ isOpen, placeholder, containerControl, parentModID }, setData] = useState(makeData(false))
  window.openControlRenameMenu = (placeholder, parentModID, containerControl) => { setData(makeData(true, placeholder, parentModID, containerControl)) }
  const onClose = () => setData(makeData(false))
  const dispatch = useDispatch()
  return (
    <RenameMenu header='rename control'
      isOpen={isOpen}
      onSubmit={newName => {
        const { modID, controlID, actualModID } = containerControl as ContainerControl
        dispatch(renameContainerControl(newName, parentModID, modID, controlID, actualModID))
        window.flashNotification('green', 'control passthrough renamed')
      }}
      placeholder={placeholder}
      initName={''}
      onClose={onClose}
    />
  )
}

export default RenameControlMenu