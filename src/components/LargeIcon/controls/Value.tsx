import React, { useState } from 'react'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { clamp } from '../../../helpers/genFuncs'
import { makeValString } from '../../Knob/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { updateControlValue, updateControlRange } from '../../../redux/allActions'
import StatelessKnob from '../../Knob/StatelessKnob'

interface Props {
  controlID: string
  setFunc: SetFunc
  actualModID: string
  displayModName?: string
  label?: string
}

function ValueControl({ controlID, setFunc, actualModID, displayModName, label }: Props) {
  const { val, currRange } = useSelector((state: RootState) => {
    return {
      val: state.modules[actualModID].controlData[controlID].value as number,
      currRange: state.modules[actualModID].controlData[controlID].range as [number, number],
    }
  })
  const [inputVal, setInputVal] = useState(makeValString(val))
  const dispatch = useDispatch()
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
          dispatch(updateControlValue(actualModID, controlID, newVal))
        }}
        onSettingsClick={() => {
          window.openKnobRangeSetMenu(actualModID, controlID, (newRange) => {
            setFunc(clamp(val, newRange).toString())
            setInputVal(makeValString(clamp(val, newRange)))
            dispatch(updateControlRange(actualModID, controlID, newRange))
          })
        }}
      />
      <div
        style={{
          marginTop: '-.3em'
        }}
      >{label ? label : displayModName ? `${displayModName} - ${controlID}` : controlID}</div>
    </div>
  )
}

export default ValueControl