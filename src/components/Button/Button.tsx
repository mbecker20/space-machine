import React from 'react'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  style?: CSS.Properties
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
}

function Button({ onClick, children, style, onPointerDown }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.Button}
      onClick={onClick}
      onPointerDown={onPointerDown}
      style={style}
    >
      {children}
    </div>
  );
}

export default Button