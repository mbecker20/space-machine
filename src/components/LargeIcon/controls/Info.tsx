import React, { Fragment } from 'react'
import { SetFunc, AudioModule } from '../../../audioModules/moduleTypes'
//import useJSS from './style'

interface Props {
  controlID: string
  setFunc: SetFunc
  audioModule: AudioModule
}

function Info({ controlID, setFunc, audioModule }: Props) {
  //const classes = useJSS()
  setFunc('')
  return (
    <Fragment>
      <div>{controlID}</div>
      <div>{audioModule.controlData[controlID].value}</div>
    </Fragment>
  )
}

export default Info