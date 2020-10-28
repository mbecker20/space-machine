import React, { useState } from 'react'
import p5Type from 'p5'
import Sketch from 'react-p5'
import { colors, sizes } from '../../../theme/theme'
import { TunerModule } from '../../../audioModules/modules/tuner'
import FlexCol from '../../Flex/FlexCol'
import { mapValBetweenRanges } from '../../../helpers/genFuncs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { Range } from '../../../audioModules/moduleTypes'
import audioCtx from '../../../audioCtx'
import Button from '../../Button/Button'
import { updateControlRange } from '../../../redux/allActions'

interface Props {
  modID: string
}

const height = 200

function Tuner({ modID }: Props) {
  const [width, setWidth] = useState(0)
  const tuner = window.audioModules[modID] as TunerModule
  const yRange = useSelector((state: RootState) => state.modules[modID].controlData['tuner'].range as Range)
  const zero = height - mapValBetweenRanges(0, yRange, [0, height])
  const dispatch = useDispatch()

  function setup(p5: p5Type, canvasParentRef: Element) {
    p5.createCanvas(canvasParentRef.clientWidth, height).parent(canvasParentRef)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.fill(100)
    p5.frameRate(2)
    setWidth(canvasParentRef.clientWidth)
  }

  function draw(p5: p5Type) {
    const [maxFreq, maxdB] = tuner.controlSetFuncs['tuner']('') as number[]
    const xStep = width / (tuner.bufferLength / 16)
    p5.background(0) // draw black background
    let currX = 0
    let currY = height - mapValBetweenRanges(tuner.freqArray[0], yRange, [0, height])
    p5.stroke(colors.analyzerModuleBG)
    p5.strokeWeight(6)
    for (let i = 0; i < tuner.bufferLength / 16; i++) {
      const nextX = (i + 1) * xStep
      const nextY = height - mapValBetweenRanges(tuner.freqArray[i + 1], yRange, [0, height])
      p5.line(currX, currY, nextX, nextY)
      currX = nextX
      currY = nextY
    }

    const zeroXStep = width / 20
    // draw 0 indicator
    p5.stroke(100)
    p5.strokeWeight(1)
    p5.line(0, zero, zeroXStep, zero)
    p5.text('0', 1.5 * zeroXStep, zero)

    // draw max freq/maxdB lines
    const maxdBLine = height - mapValBetweenRanges(maxdB, yRange, [0, height])
    p5.line(0, maxdBLine, width, maxdBLine)
    const maxFreqLine = mapValBetweenRanges(maxFreq, [0, audioCtx.sampleRate / 32], [0, width])
    p5.line(maxFreqLine, 0, maxFreqLine, height)
    p5.text(maxFreq, width - 10, height / 2)
  }

  return (
    <FlexCol justifyContent='center' alignItems='center'>
      <Sketch style={{ width: sizes.moduleView.bigIconWidth }}
        setup={setup}
        draw={draw}
      />
      <Button style={{ width: '10em' }}
        onClick={() => {
          window.openAnalyzerRangeSetMenu(yRange, newRange => {
            dispatch(updateControlRange(modID, 'tuner', newRange))
          })
        }}
      >
        change range
      </Button>
    </FlexCol>
  )
}

export default Tuner