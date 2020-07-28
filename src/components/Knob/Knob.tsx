import React, { useState } from 'react'
import StatelessKnob from './StatelessKnob'
import { clamp } from '../../helpers/genFuncs'

interface Props {
  initValue: number
  onChange?: (newVal: number) => void
  onEveryChange: (newVal: number) => void
  range: [number, number]
  onSettingsClick?: () => void
}

function Knob({ initValue, range, onChange, onEveryChange, onSettingsClick }: Props) {
  const [val, setVal] = useState(clamp(initValue, range))
  return (
    <StatelessKnob
      initValue={val}
      range={range}
      onChange={newVal => {
        if (onChange) { onChange(newVal) }
        setVal(newVal)
      }}
      onEveryChange={onEveryChange}
      onSettingsClick={onSettingsClick}
    />
  )
}

export default Knob