import React from 'react'
//import useJSS from './style'
import { Value, Range, AudioModule, SetFunc, ConnectingAudioModule } from '../../../audioModules/moduleTypes'
import { Knob } from '../../all'

interface Props {
  controlID: string
  value: Value | undefined
  audioModule: AudioModule
  range: Range
  paramID: string
  setFunc: SetFunc
  reRenderIcon: () => void
}

function ValueControl({ controlID, value, audioModule, range, paramID, setFunc, reRenderIcon }: Props) {
  const { audioNode } = audioModule as ConnectingAudioModule
  //const classes = useJSS()
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Knob
        initValue={typeof (value) === 'number' ? value : audioNode[paramID].value}
        range={range.slice(0, 2) as [number, number]}
        onEveryChange={newVal => {
          setFunc(newVal.toString())
        }}
      />
      <div>{controlID}</div>
    </div>
  )
}

export default ValueControl