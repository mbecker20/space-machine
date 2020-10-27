import React, { useState } from 'react'
import p5Type from 'p5'
import Sketch from 'react-p5'
import { sizes } from '../../../theme/theme'

interface Props {
  modID: string
}

function Tuner({ modID }: Props) {
  const [width, setWidth] = useState(0)

  function setup(p5: p5Type, canvasParentRef: Element) {
    p5.createCanvas(canvasParentRef.clientWidth, 200).parent(canvasParentRef)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.fill(100)
    setWidth(canvasParentRef.clientWidth)
  }

  function draw(p5: p5Type) {
    analyzer.audioNode
  }

  return (
    <div>
      <Sketch style={{ width: sizes.moduleView.bigIconWidth }}
        setup={setup}
        draw={draw}
      />
    </div>
  )
}

export default Tuner