import React, { useState } from 'react'
import { CenterMenu } from '../../all'
import useJSS from './style'
import Button from '../../Button/Button'

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
      <div className={classes.CMInputBounder}>
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
      <Button
        onClick={() => {
          
        }}
      >

      </Button>
    </CenterMenu>
  )
}

export default AnalyzerRangeSetMenu