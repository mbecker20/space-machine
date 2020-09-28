import React from 'react'
import DeleteButton from '../../DeleteButton'

interface Props {
  saveName: string
  onClose: () => void
}

function ModuleDeleteButton({ saveName, onClose }: Props) {
  return (
    <DeleteButton onClick={() => {
      window.containerSaveService.remove(saveName).then((res: string) => {
        console.log(res)
        //window.flashNotification(r)
        window.refreshSpaceDBModules()
        onClose()
      })
    }}/>
  )
}

export default ModuleDeleteButton