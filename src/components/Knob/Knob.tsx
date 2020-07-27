import React, { useState } from 'react'
import StatelessKnob from './StatelessKnob'
import { clamp } from '../../helpers/genFuncs'

interface Props {
  initValue: number
  onChange: (newVal: number) => void
  range: [number, number]
}

function Knob({ initValue, range, onChange }: Props) {
  const [val, setVal] = useState(clamp(initValue, range))
  return (
    <StatelessKnob
      initValue={val}
      range={range}
      onChange={newVal => {
        onChange(newVal)
        setVal(newVal)
      }}
    />
  )
}

export default Knob