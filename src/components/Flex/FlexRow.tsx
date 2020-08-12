import React from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  style?: CSS.Properties
  children?: React.ReactNode
}

function FlexRow({ children, style }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.FlexRow}
      style={style}
    >
      { children }
    </div>
  )
}

export default FlexRow