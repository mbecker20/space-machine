import React, { Fragment, RefObject, useImperativeHandle } from 'react'
import Sketch from 'react-p5'
import { SplineLines } from './types'
//import useJSS from './style'

interface Props {
  interactClassName: string
  canvasClassName: string
}

function SplineLines({ interactClassName }: Props, ref: RefObject<SplineLines>) {
  //const classes = useJSS()
  let redraw = () => {}
  useImperativeHandle(ref, () => ({
    redraw: () => {
      redraw()
    }
  }))
  return (
    <Fragment>
      <div className={interactClassName}>

      </div>
      <Sketch
        setup={(p5, canvasParentRef) => {
          p5.createCanvas(100, 100).parent(canvasParentRef)
          p5.noLoop()
          redraw = p5.redraw
        }}
      />
    </Fragment>
  )
}

export default SplineLines