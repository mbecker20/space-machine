import React, { useState } from 'react'
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
}

function ValueControl({ controlID, value, audioModule, range, paramID, setFunc }: Props) {
  const { audioNode } = audioModule as ConnectingAudioModule
  const [currRange, setCurrRange] = useState(range)
  //const classes = useJSS()
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Knob
        initValue={typeof (value) === 'number' ? value : audioNode[paramID].value}
        range={currRange}
        onEveryChange={newVal => {
          setFunc(newVal.toString())
        }}
        onSettingsClick={() => {
          window.openRangeSetMenu(window.highlightedID, controlID, (newRange) => {
            setCurrRange(newRange)
          })
        }}
      />
      <div>{controlID}</div>
    </div>
  )
}

export default ValueControl