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
  onPointerEnter?: (e: MouseEvent<HTMLDivElement>) => void
  onPointerLeave?: (e: MouseEvent<HTMLDivElement>) => void
}

function Button({ 
  className, onClick, children, style, onPointerDown, 
  buttonRef, onKeyDown, onContextMenu, fontSize, notClickable,
  onPointerEnter, onPointerLeave
}: Props) {
  const classes = useJSS({ fontSize, notClickable })
  return (
    <div className={className ? `${classes.Button} ${className}` : classes.Button}
      onClick={onClick}
      onPointerDown={onPointerDown}
      style={style}
      ref={buttonRef}
      onKeyDown={onKeyDown}
      onContextMenu={onContextMenu}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  );
}

export default Button