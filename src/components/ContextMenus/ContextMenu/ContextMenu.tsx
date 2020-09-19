import React, { MouseEvent, ReactChildren } from 'react'
import useJSS from './style'

interface Props {
  e: MouseEvent<HTMLDivElement>
  children: ReactChildren
}

function ContextMenu({ e, children }: Props) {
  const classes = useJSS()
  const top = (window.innerHeight - e.pageY) > window.innerHeight / 4 ? 
    e.pageY : undefined
  const left = (window.innerWidth - e.pageX) > window.innerWidth / 6 ? 
    e.pageX : undefined
  const bottom = (window.innerHeight - e.pageY) <= window.innerHeight / 4 ?
    e.pageY : undefined
  const right = (window.innerWidth - e.pageX) <= window.innerWidth / 6 ?
    e.pageX : undefined
  return (
    <div className={classes.Bounder}>
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