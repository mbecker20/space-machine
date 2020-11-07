import React, { RefObject, KeyboardEvent, MouseEvent } from 'react'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  className?: string
  children?: React.ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  style?: CSS.Properties
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
  buttonRef?: RefObject<HTMLDivElement>
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void
  fontSize?: string
  notClickable?: boolean
}

function Button({ className, onClick, children, style, onPointerDown, buttonRef, onKeyDown, onContextMenu, fontSize, notClickable }: Props) {
  const classes = useJSS({ fontSize, notClickable })
  return (
    <div className={className ? `${classes.Button} ${className}` : classes.Button}
      onClick={onClick}
      onPointerDown={onPointerDown}
      style={style}
      ref={buttonRef}
      onKeyDown={onKeyDown}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
}

export default Button