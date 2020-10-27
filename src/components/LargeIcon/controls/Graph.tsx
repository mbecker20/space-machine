import React, { useState } from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { AnalyzerModule } from '../../../audioModules/modules/analyzer'
import { mapValBetweenRanges } from '../../../helpers/genFuncs'
import { colors, sizes } from '../../../theme/theme'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { Range } from '../../../audioModules/moduleTypes'
import { updateControlRange } from '../../../redux/allActions'
import FlexCol from '../../Flex/FlexCol'
import Button from '../../Button/Button'

interface Props {
  modID: string
}

const height = 200

function Graph({ modID }: Props) {
  const analyzer = window.audioModules[modID] as AnalyzerModule
  const yRange = useSelector((state: RootState) => state.modules[modID].controlData['time graph'].range as Range)
  const zero = height - mapValBetweenRanges(0, yRange, [0, height])
  const [width, setWidth] = useState(0)

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(canvasParentRef.clientWidth, height).parent(canvasParentRef)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.fill(100)
    setWidth(canvasParentRef.clientWidth)
  }

  function draw(p5: p5Types) {
    analyzer.audioNode.getFloatTimeDomainData(analyzer.timeArray)
    const xStep = width / analyzer.bufferLength
    p5.background(0) // draw black background

    let currX = 0
    let currY = height - mapValBetweenRanges(analyzer.timeArray[0], yRange, [0, height])
    p5.stroke(colors.analyzerModuleBG)
    p5.strokeWeight(6)
    for (let i = 0; i < analyzer.bufferLength - 1; i++) {
      const nextX = (i + 1) * xStep
      const nextY = height - mapValBetweenRanges(analyzer.timeArray[i + 1], yRange, [0, height])
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
  }

  const dispatch = useDispatch()
  return (
    <FlexCol style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Sketch style={{ width: sizes.moduleView.bigIconWidth }}
        setup={setup} 
        draw={draw} 
      />
      <Button style={{ width: '10em' }}
        onClick={() => {
          window.openAnalyzerRangeSetMenu(yRange, newRange => {
            dispatch(updateControlRange(modID, 'time graph', newRange))
          })
        }}
      >
        change range
      </Button>
    </FlexCol>
  )
}

export default Graph