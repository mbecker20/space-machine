import React, { useState } from 'react'
import { CenterMenu } from '../../all'
import useJSS from './style'
import Button from '../../Button/Button'
import { Range } from '../../../audioModules/moduleTypes'
import { sizes, colors } from '../../../theme/theme'

interface Props {
  onClose: () => void
  onChangeSubmit: (newRange: Range) => void
  range: [number, number]
}

function AnalyzerRangeSetMenu({ range, onChangeSubmit, onClose }: Props) {
  const classes = useJSS()
  const [min, setMin] = useState(range[0])
  const [max, setMax] = useState(range[1])
  return (
    <CenterMenu header='set analyzer range' onClose={onClose}>
      <div className={classes.CMInputBounder}
        onKeyDown={e => {
          if (e.keyCode === 27) {
            onClose()
          } else if (e.keyCode === 13) {
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