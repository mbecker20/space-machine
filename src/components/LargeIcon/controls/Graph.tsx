import React from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { AnalyzerModule } from '../../../audioModules/modules/analyzer'
import { mapValBetweenRanges } from '../../../helpers/genFuncs'

interface Props {
  width?: number
  height?: number
  modID: string
  setFunc: (arg: string) => void
}

const width = 300
const height = 200

function Graph({ modID, setFunc }: Props) {
  const yRange: [number, number] = [-2, 2]
  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke(0,0,255)
    p5.strokeWeight(4)
  }

  const analyzer = window.audioModules[modID] as AnalyzerModule
  function draw(p5: p5Types) {
    setFunc('')
    const timeArray = analyzer.timeArray
    const xStep = width / analyzer.bufferLength
    p5.background(0) // draw black background
    let currX = 0
    let currY = height - mapValBetweenRanges(timeArray[0], yRange, [0, height])
    for (let i = 0; i < analyzer.bufferLength - 1; i++) {
      const nextX = (i + 1) * xStep
      const nextY = height - mapValBetweenRanges(timeArray[i + 1], yRange, [0, height])
      p5.line(currX, currY, nextX, nextY)
      currX = nextX
      currY = nextY
    }
  }

  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default Graph