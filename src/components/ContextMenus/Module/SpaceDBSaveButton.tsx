import React, { Fragment } from 'react'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { Modules } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import useJSS from './style'

interface Props {
  modules: Modules
  modID: string
  onClose: () => void
}

function SpaceDBSaveButton({ modules, modID, onClose }: Props) {
  const classes = useJSS()
  return (
    <Fragment>
      {!window.usingElectron || modules[modID].moduleType !== CONTAINER ? null :
      <Button className={classes.SaveButton}
        onClick={() => {
          window.containerSaveService.find().then((containerSaves: string[]) => {
            window.openSpaceDBContainerSaveMenu(containerSaves, modID, onClose)
          })
          onClose()
        }}
      >
        save to spaceDB
      </Button>}
    </Fragment>
  )
}

export default SpaceDBSaveButton