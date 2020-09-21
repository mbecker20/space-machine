import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { getLocation } from './helpers'
import useJSS from './style'

interface Props {
  e: MouseEvent<HTMLDivElement>
  children: ReactNode
  onClose: () => void
}

function ContextMenu({ e, children, onClose }: Props) {
  const classes = useJSS()
  const cmRef = useRef<HTMLDivElement>(null)
  const [location, setLocation] = useState(getLocation(e, cmRef))
  useEffect(() => {
    setLocation(getLocation(e, cmRef))
  }, [e])
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
      >
        { children }
      </div>
    </div>
  )
}

export default ContextMenu