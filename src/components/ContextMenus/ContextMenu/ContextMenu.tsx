import React, { MouseEvent, ReactNode } from 'react'
import useJSS from './style'

interface Props {
  e: MouseEvent<HTMLDivElement>
  children: ReactNode
  onClose: () => void
}

function ContextMenu({ e, children, onClose }: Props) {
  const classes = useJSS()
  const top = (window.innerHeight - e.pageY) > window.innerHeight / 4 ? 
    e.pageY : undefined
  const left = (window.innerWidth - e.pageX) > window.innerWidth / 6 ? 
    e.pageX : undefined
  const bottom = (window.innerHeight - e.pageY) <= window.innerHeight / 4 ?
    window.innerHeight - e.pageY : undefined
  const right = (window.innerWidth - e.pageX) <= window.innerWidth / 6 ?
    window.innerWidth - e.pageX : undefined
  return (
    <div className={classes.Bounder}
      onPointerDown={onClose}
    >
      <div className={classes.ContextMenu}
        style={{
          top,
          left,
          bottom,
          right,
        }}
      >
        { children }
      </div>
    </div>
  )
}

export default ContextMenu