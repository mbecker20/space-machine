import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { ContextMenuBaseProps } from '../types'
import { getLocation } from './helpers'
import useJSS from './style'

interface Props extends ContextMenuBaseProps {
  children: ReactNode
}

function ContextMenu({ event, children, onClose }: Props) {
  const classes = useJSS()
  const cmRef = useRef<HTMLDivElement>(null)
  const [location, setLocation] = useState(getLocation(event, cmRef))
  useEffect(() => {
    setLocation(getLocation(event, cmRef))
  }, [event])
  return (
    <div className={classes.Bounder}
      onPointerDown={onClose}
    >
      <div className={classes.ContextMenu}
        style={{
          top: location.top,
          left: location.left,
        }}
        ref={cmRef}
        onPointerDown={e => { e.stopPropagation() }}
      >
        { children }
      </div>
    </div>
  )
}

export default ContextMenu