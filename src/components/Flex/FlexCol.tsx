import React from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  style?: CSS.Properties
  children?: React.ReactNode
}

function FlexCol({ children, style }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.FlexCol}
      style={style}
    >
      { children }
    </div>
  );
}

export default FlexCol