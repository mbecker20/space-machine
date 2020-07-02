import React from 'react'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  children?: React.ReactNode
  onClick?: () => void
  style?: CSS.Properties
}

function Button({ onClick, children, style }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.Button}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}

export default Button