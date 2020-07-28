import React, { useState } from 'react'
import { CenterMenu, Button } from '../../all'
import useJSS from './style'
import { Range } from '../../../audioModules/moduleTypes'
import { clamp } from '../../../helpers/genFuncs'

interface Props {
  onClose: () => void
  onChangeSubmit: (newRange: Range) => void
  modID: string
  dataKey: string
}

function RangeSetMenu({ onClose, modID, dataKey, onChangeSubmit }: Props) {
  const { maxRange, range, value } = window.audioModules[modID].controlData[dataKey]
  const [min, setMin] = useState((range as [number, number])[0])
  const [max, setMax] = useState((range as [number, number])[1])
  const classes = useJSS()
  return (
    <CenterMenu header='set range' onClose={onClose}>
      {!maxRange ? null 
      :
      `max range from ${maxRange[0]} to ${maxRange[1]}`
      }
      <div className={classes.CMInputBounder}
        onKeyDown={e => {
          if (e.keyCode === 27) {
            onClose()
          }
        }}
      >
        <input className={classes.CenterMenuInput} 
          onChange={e => {
            if (maxRange) {
              setMin(clamp(Number(e.target.value), [maxRange[0], max]))
            } else {
              setMin(Math.min(Number(e.target.value), max))
            }
          }}
          value={min}
          type='number'
        />
        <input className={classes.CenterMenuInput}
          onChange={e => { 
            if (maxRange) {
              setMax(clamp(Number(e.target.value), [min, maxRange[1]])) 
            } else {
              setMax(Math.max(Number(e.target.value), min))
            }
          }}
          value={max}
          type='number'
        />
      </div>
      <Button onClick={() => {
        (window.audioModules[modID].controlData[dataKey].range as [number, number])[0] = min;
        (window.audioModules[modID].controlData[dataKey].range as [number, number])[1] = max;
        window.audioModules[modID].controlSetFuncs[dataKey](clamp(value as number, [min, max]).toString())
        onChangeSubmit([min, max])
        onClose()
      }}>
        confirm
      </Button>
    </CenterMenu>
  )
}

export default RangeSetMenu