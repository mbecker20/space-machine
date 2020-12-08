import React, { Fragment } from 'react'
//import useJSS from './style'

interface Props {
  interactClassName: string
  canvasClassName: string
}

function SplineLines({ interactClassName }: Props) {
  //const classes = useJSS()
  return (
    <Fragment>
      <div className={interactClassName}>
        
      </div>
    </Fragment>
  )
}

export default SplineLines