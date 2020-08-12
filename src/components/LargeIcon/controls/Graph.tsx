import React from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { AnalyzerModule } from '../../../audioModules/modules/analyzer'
import { mapValBetweenRanges } from '../../../helpers/genFuncs'
import { colors } from '../../../theme/theme'
import { FlexCol, Button } from '../../all'

interface Props {
  width?: number
  height?: number
  modID: string
  setFunc: (arg: string) => void
}

const width = 300
const height = 200

function Graph({ modID, setFunc }: Props) {
  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.fill(100)
  }

  const analyzer = window.audioModules[modID] as AnalyzerModule
  let yRange: [number, number] = [-2, 2]
  let zero = height - mapValBetweenRanges(0, yRange, [0, height])
  function draw(p5: p5Types) {
    setFunc('')
    const timeArray = analyzer.timeArray
    const xStep = width / analyzer.bufferLength
    p5.background(0) // draw black background

    let currX = 0
    let currY = height - mapValBetweenRanges(timeArray[0], yRange, [0, height])
    p5.stroke(colors.analyzerModuleBG)
    p5.strokeWeight(4)
    for (let i = 0; i < analyzer.bufferLength - 1; i++) {
      const nextX = (i + 1) * xStep
      const nextY = height - mapValBetweenRanges(timeArray[i + 1], yRange, [0, height])
      p5.line(currX, currY, nextX, nextY)
      currX = nextX
      currY = nextY
    }

    // draw 0 indicator
    p5.stroke(100)
    p5.strokeWeight(1)
    p5.line(0, zero, 100 * xStep, zero)
    p5.text('0', 120 * xStep, zero)
  }

  return (
    <FlexCol>
      <Sketch setup={setup} draw={draw} />
      <Button
        onClick={() => {

        }}
      >
        change range
      </Button>
    </FlexCol>
  )
}

export default Graph