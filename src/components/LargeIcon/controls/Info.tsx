import React, { Fragment } from 'react'
import { SetFunc, AudioModule } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  audioModule: AudioModule
  modID?: string
}

function Info({ controlID, setFunc, audioModule, modID }: Props) {
  setFunc('')
  return (
    <Fragment>
      <div>{modID ? `${modID} - ${controlID}` : controlID}</div>
      <div>{audioModule.controlData[controlID].value}</div>
    </Fragment>
  )
}

export default Info