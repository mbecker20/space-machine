import React, { useState } from 'react'
import useJSS from './style'
import { Range } from '../../../audioModules/moduleTypes'
import { inRange } from '../../../helpers/genFuncs'
import { sizes, colors } from '../../../theme/theme'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import CenterMenu from '../CenterMenu/CenterMenu'
import Button from '../../Button/Button'

interface Props {
  onClose: () => void
  onChangeSubmit: (newRange: Range) => void
  modID: string
  controlID: string
}

function KnobRangeSetMenu({ onClose, modID, controlID, onChangeSubmit }: Props) {
  const { maxRange, range } = useSelector((state: RootState) => state.modules[modID].controlData[controlID])
  const [min, setMin] = useState((range as [number, number])[0])
  const [max, setMax] = useState((range as [number, number])[1])
  const classes = useJSS()
  return (
    <CenterMenu header={`set ${controlID} range`} onClose={onClose}>
      <div style={{ fontSize: sizes.text.small }}>
        {!maxRange ? null 
        :
        `max range from ${maxRange[0]} to ${maxRange[1]}`
        }
      </div>
      <div className={classes.CMInputBounder}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            onClose()
          } else if (e.key === 'Enter') {
            onChangeSubmit([min, max])
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
      <Button style={{ fontSize: sizes.text.small, backgroundColor: colors.confirmButton }}
        onClick={() => {
          if (maxRange) {
            if (inRange(min, maxRange) && inRange(max, maxRange)) {
              if (max > min) {
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
              onChangeSubmit([min, max])
              onClose()
            } else {
              alert('min must be less than max')
            }
          }
        }}
      >
        confirm
      </Button>
    </CenterMenu>
  )
}

export default KnobRangeSetMenu