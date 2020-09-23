import React from 'react'
import DeleteButton from '../../DeleteButton'

interface Props {
  saveName: string
  setSaveList: (arg: string[]) => void
  onClose: () => void
}

function ProjectDeleteButton({ saveName, setSaveList, onClose }: Props) {
  return (
    <DeleteButton 
      onClick={() => {
        window.openConfirmDeleteMenu(saveName, () => {
          window.setTimeout(() => {
            window.projectSaveService.find().then((saveNames: string[]) => { 
              setSaveList(saveNames) 
            })
          }, 1000)
        })
        onClose()
      }}
    />
  )
}

export default ProjectDeleteButton