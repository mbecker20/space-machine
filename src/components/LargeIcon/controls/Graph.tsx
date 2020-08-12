import React from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { AnalyzerModule } from '../../../audioModules/modules/analyzer'
import { mapValBetweenRanges } from '../../../helpers/genFuncs'
import { colors, sizes } from '../../../theme/theme'
import { FlexCol, Button } from '../../all'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { Range } from '../../../audioModules/moduleTypes'
import { updateControlRange } from '../../../redux/allActions'

interface Props {
  modID: string
  setFunc: (arg: string) => void
}

const height = 200

function Graph({ modID, setFunc }: Props) {
  const analyzer = window.audioModules[modID] as AnalyzerModule
  const yRange = useSelector((state: RootState) => state.modules[modID].controlData['time graph'].range as Range)
  let width = 0
  let zero = height - mapValBetweenRanges(0, yRange, [0, height])

  function setup(p5: p5Types, canvasParentRef: Element) {
    width = canvasParentRef.clientWidth
    zero = height - mapValBetweenRanges(0, yRange, [0, height])
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.fill(100)
  }

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
    p5.line(0, zero, 60 * xStep, zero)
    p5.text('0', 80 * xStep, zero)
  }

  const dispatch = useDispatch()
  return (
    <FlexCol style={{ justifyContent: 'center' }}>
      <Sketch style={{ width: sizes.moduleView.bigIconWidth, margin: '.5vmin 0vmin' }}
        setup={setup} 
        draw={draw} 
      />
      <Button style={{ width: '10em' }}
        onClick={() => {
          window.openAnalyzerRangeSetMenu(yRange, (newRange) => {
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