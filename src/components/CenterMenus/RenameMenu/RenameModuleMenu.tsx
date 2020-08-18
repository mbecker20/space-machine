import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { renameModule } from '../../../redux/allActions'
import RenameMenu from './RenameMenu'


interface Props {
  onClose: () => void
  toRenameID: string
}

function RenameModuleMenu({ toRenameID, onClose }: Props) {
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  return (
    <RenameMenu header='rename module' 
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