import React, { useState } from 'react'
import { CenterMenu, Button } from '../../all'
import useJSS from './style'
import { Range } from '../../../audioModules/moduleTypes'
import { clamp, inRange } from '../../../helpers/genFuncs'
import { sizes } from '../../../theme/theme'

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
    <CenterMenu header={`set ${dataKey} range`} onClose={onClose}>
      <div style={{ fontSize: sizes.text.small }}>
        {!maxRange ? null 
        :
        `max range from ${maxRange[0]} to ${maxRange[1]}`
        }
      </div>
      <div className={classes.CMInputBounder}
        onKeyDown={e => {
          if (e.keyCode === 27) {
            onClose()
          }
        }}
      >
        <input className={classes.CenterMenuInput} 
          onChange={e => {
            setMin(Number(e.target.value))
          }}
          value={min}
          type='number'
        />
        <input className={classes.CenterMenuInput}
          onChange={e => { 
            setMax(Number(e.target.value)) 
          }}
          value={max}
          type='number'
        />
      </div>
      <Button onClick={() => {
        if (maxRange) {
          if (inRange(min, maxRange) && inRange(max, maxRange)) {
            if (max > min) {
              (window.audioModules[modID].controlData[dataKey].range as [number, number])[0] = min;
              (window.audioModules[modID].controlData[dataKey].range as [number, number])[1] = max;
              window.audioModules[modID].controlSetFuncs[dataKey](clamp(value as number, [min, max]).toString())
              onChangeSubmit([min, max])
              onClose()
            } else {
              alert('min must be less than max')
            }
          } else {
            alert('a value is not within maximum range bounds')
          }
        } else {
          if (max > min) {
            (window.audioModules[modID].controlData[dataKey].range as [number, number])[0] = min;
            (window.audioModules[modID].controlData[dataKey].range as [number, number])[1] = max;
            window.audioModules[modID].controlSetFuncs[dataKey](clamp(value as number, [min, max]).toString())
            onChangeSubmit([min, max])
            onClose()
          } else {
            alert('min must be less than max')
          }
        }
      }}>
        confirm
      </Button>
    </CenterMenu>
  )
}

export default RangeSetMenu