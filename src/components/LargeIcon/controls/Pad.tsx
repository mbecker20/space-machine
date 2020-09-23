import React from 'react'
import useJSS from './style'

interface Props {
  setFunc: (arg: string) => void
}

function PadControl({ setFunc }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.Pad}
      onPointerDown={e => {
        e.preventDefault()
        setFunc('on')
      }}
      onPointerCancel={e => {
        e.preventDefault()
        setFunc('off')
      }}
      onPointerUp={e => {
        e.preventDefault()
        setFunc('off')
      }}
    />
  )
}

export default PadControl