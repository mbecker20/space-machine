import React, { Fragment } from 'react'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { Modules } from '../../../redux/stateTSTypes'
import { Button } from '../../all'
import useJSS from './style'

interface Props {
  modules: Modules
  modID: string
  onClose: () => void
}

function ContainerOpenButton({ modules, modID, onClose }: Props) {
  const classes = useJSS()
  return (
    <Fragment>
      {modules[modID].moduleType !== CONTAINER ? null :
        <Button className={classes.OpenButton}
          onClick={() => {
            window.fillContainerID = modID
            window.reRenderFillContainer()
            onClose()
          }}
          onPointerDown={(e) => { e.stopPropagation() }}
        >
          open
        </Button>
      }
    </Fragment>
  )
}

export default ContainerOpenButton