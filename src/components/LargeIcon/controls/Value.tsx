import React, { useState } from 'react'
import { Value, Range, SetFunc } from '../../../audioModules/moduleTypes'
import { StatelessKnob } from '../../all'
import { clamp } from '../../../helpers/genFuncs'
import { makeValString } from '../../Knob/helpers'

interface Props {
  controlID: string
  value: Value | undefined
  range: Range
  setFunc: SetFunc
  actualModID?: string
  displayModName?: string
}

function ValueControl({ controlID, value, range, setFunc, actualModID, displayModName }: Props) {
  const [currRange, setCurrRange] = useState(range)
  const [val, setVal] = useState(value as number)
  const [inputVal, setInputVal] = useState(makeValString(val))
  const modID = actualModID ? actualModID : window.highlightedID
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <StatelessKnob
        initValue={val}
        range={currRange}
        inputVal={inputVal}
        setInputVal={setInputVal}
        onEveryChange={newVal => {
          setFunc(newVal.toString())
        }}
        onChange={newVal => {
          setFunc(newVal.toString())
          setVal(newVal)
        }}
        onSettingsClick={() => {
          window.openRangeSetMenu(modID, controlID, (newRange) => {
            setCurrRange(newRange)
            setVal(clamp(val, newRange))
            setInputVal(makeValString(clamp(val, newRange)))
          })
        }}
      />
      <div>{displayModName ? `${displayModName} - ${controlID}` : controlID}</div>
    </div>
  )
}

export default ValueControl