import React, { RefObject, KeyboardEvent, MouseEvent } from 'react'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  className?: string
  children?: React.ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  style?: CSS.Properties
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
  ref?: RefObject<HTMLDivElement>
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void
}

function Button({ className, onClick, children, style, onPointerDown, ref, onKeyDown, onContextMenu }: Props) {
  const classes = useJSS()
  return (
    <div className={className ? `${classes.Button} ${className}` : classes.Button}
      onClick={onClick}
      onPointerDown={onPointerDown}
      style={style}
      ref={ref}
      onKeyDown={onKeyDown}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
}

export default Button