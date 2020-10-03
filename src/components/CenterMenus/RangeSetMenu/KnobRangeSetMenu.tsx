import React, { useState } from 'react'
import useJSS from './style'
import { Range } from '../../../audioModules/moduleTypes'
import { inRange } from '../../../helpers/genFuncs'
import { sizes, colors } from '../../../theme/theme'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import CenterMenu from '../CenterMenu/CenterMenu'
import Button from '../../Button/Button'

declare global {
  interface Window {
    openKnobRangeSetMenu: (modID: string, controlID: string, onChangeSubmit: (newRange: Range) => void) => void
  }
}

function makeData(isOpen: boolean, controlID = '', onChangeSubmit: (newRange: Range) => void = () => { }) {
  return {
    isOpen,
    controlID,
    onChangeSubmit,
  }
}

function KnobRangeSetMenu() {
  const [{ isOpen, controlID, onChangeSubmit }, setData] = useState(makeData(false))
  const modules = useSelector((state: RootState) => state.modules)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [maxRange, setMaxRange] = useState<[number, number] | undefined>(undefined)
  window.openKnobRangeSetMenu = (modID, controlID, onChangeSubmit) => {
    const { range, maxRange } = modules[modID].controlData[controlID]
    setData(makeData(
      true, 
      controlID, 
      onChangeSubmit
    ))
    setMin((range as [number, number])[0])
    setMax((range as [number, number])[1])
    setMaxRange(maxRange)
  }
  const onClose = () => { 
    setData(makeData(false))
  }
  const classes = useJSS()
  return (
    <CenterMenu isClosed={!isOpen} header={`set ${controlID} range`} onClose={onClose}>
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
            if (inRange(min, maxRange as [number, number]) && inRange(max, maxRange as [number, number])) {
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