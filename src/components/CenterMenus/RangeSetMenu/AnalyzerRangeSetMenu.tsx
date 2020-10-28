import React, { useState } from 'react'
import useJSS from './style'
import Button from '../../Button/Button'
import { Range } from '../../../audioModules/moduleTypes'
import { sizes, colors } from '../../../theme/theme'
import CenterMenu from '../CenterMenu/CenterMenu'

declare global {
  interface Window {
    openAnalyzerRangeSetMenu: (range: Range, onChangeSubmit: (newRange: Range) => void) => void
  }
}

function makeData(isOpen: boolean, onChangeSubmit: (newRange: Range) => void = () => { }) {
  return {
    isOpen,
    onChangeSubmit,
  }
}

function AnalyzerRangeSetMenu() {
  const [{ isOpen, onChangeSubmit }, setData] = useState(makeData(false))
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  window.openAnalyzerRangeSetMenu = (range, onChangeSubmit) => { 
    setMin(range[0])
    setMax(range[1])
    setData(makeData(true, onChangeSubmit))
  }
  const onClose = () => { setData(makeData(false)) }
  const classes = useJSS()
  return (
    <CenterMenu isClosed={!isOpen} header='set analyzer range' onClose={onClose}>
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
          onChangeSubmit([min, max])
          onClose()
        }}
      >
        confirm
      </Button>
    </CenterMenu>
  )
}

export default AnalyzerRangeSetMenu