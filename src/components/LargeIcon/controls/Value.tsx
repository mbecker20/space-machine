import React, { useState } from 'react'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { StatelessKnob } from '../../all'
import { clamp } from '../../../helpers/genFuncs'
import { makeValString } from '../../Knob/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { updateControlValue, updateControlRange } from '../../../redux/allActions'

interface Props {
  controlID: string
  setFunc: SetFunc
  actualModID?: string
  displayModName?: string
}

function ValueControl({ controlID, setFunc, actualModID, displayModName }: Props) {
  const modID = actualModID ? actualModID : window.highlightedID
  const [ val, currRange ] = useSelector((state: RootState) => {
    return [
      state.modules[modID].controlData[controlID].value as number,
      state.modules[modID].controlData[controlID].range as [number, number],
    ]
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
          dispatch(updateControlValue(modID, controlID, newVal))
        }}
        onSettingsClick={() => {
          window.openRangeSetMenu(modID, controlID, (newRange) => {
            dispatch(updateControlRange(modID, controlID, newRange))
            setFunc(clamp(val, newRange).toString())
            setInputVal(makeValString(clamp(val, newRange)))
          })
        }}
      />
      <div>{displayModName ? `${displayModName} - ${controlID}` : controlID}</div>
    </div>
  )
}

export default ValueControl