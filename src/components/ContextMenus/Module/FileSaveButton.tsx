import React from 'react'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { Modules } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import Conditional from '../../Conditional/Conditional'
import useJSS from './style'

interface Props {
  modID: string
  modules: Modules
  onClose: () => void
}

function FileSaveButton({ modID, modules, onClose }: Props) {
  const classes = useJSS()
  return (
    <Conditional showIf={modules[modID].moduleType === CONTAINER}>
      <Button className={classes.SaveButton}
        onClick={() => {
          window.openFileContainerSaveMenu(modID)
          onClose()
        }}
      >
        save to file
      </Button>
    </Conditional>
  )
}

export default FileSaveButton