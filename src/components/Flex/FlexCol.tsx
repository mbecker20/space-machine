import React from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  style?: CSS.Properties
  children?: React.ReactNode
  ref?: React.RefObject<HTMLDivElement>
}

function FlexCol({ children, style, ref }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.FlexCol}
      style={style}
      ref={ref}
    >
      { children }
    </div>
  );
}

export default FlexCol