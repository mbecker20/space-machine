import React, { Fragment } from 'react'
import { SetFunc, AudioModule } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  audioModule: AudioModule
  modName?: string
}

function Info({ controlID, setFunc, audioModule, modName }: Props) {
  setFunc('')
  return (
    <Fragment>
      <div>{modName ? `${modName} - ${controlID}` : controlID}</div>
    </Fragment>
  )
}

export default Info