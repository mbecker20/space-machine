import React, { Fragment } from 'react'
import useJSS from './style'
import { Value, Range, AudioModule, SetFunc } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  value: Value | undefined
  audioModule: AudioModule
  range: Range | undefined
  paramID: string
  setFunc: SetFunc
}

function ValueControl({ controlID, value, audioModule, range, paramID, setFunc }: Props) {
  const { audioNode } = audioModule
  const classes = useJSS()
  return (
    <Fragment>
      <div>{controlID}</div>
      <input className={classes.ControlInput}
        type='number'
        value={typeof(value) === 'number' ? value : audioNode[paramID].value}
        min={range ? range[0] : undefined}
        max={range ? range[1] : undefined}
        step={!range ? undefined : range[2] ? range[2] : undefined}
        onChange={(e) => {
          setFunc(e.target.value)
          window.reRenderLeftDrawer()
        }}
      />
    </Fragment>
  )
}

export default ValueControl