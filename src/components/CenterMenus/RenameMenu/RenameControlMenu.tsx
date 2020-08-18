import React from 'react'
import RenameMenu from './RenameMenu'
import { useDispatch } from 'react-redux'
import { renameContainerControl } from '../../../redux/allActions'
import { ContainerControl } from '../../../redux/stateTSTypes'

interface Props {
  placeholder: string
  containerControl: ContainerControl
  parentModID: string
  onClose: () => void
}

function RenameControlMenu({ placeholder, containerControl, parentModID, onClose }: Props) {
  const dispatch = useDispatch()
  const { modID, controlID, actualModID } = containerControl
  return (
    <RenameMenu header='rename control'
      onSubmit={newName => {
        dispatch(renameContainerControl(newName, parentModID, modID, controlID, actualModID))
      }}
      placeholder={placeholder}
      initName={''}
      onClose={onClose}
    />
  )
}

export default RenameControlMenu