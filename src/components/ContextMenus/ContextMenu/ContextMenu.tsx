import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { MouseDivEvent } from '../types'
import { getLocation } from './helpers'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  children: ReactNode
  event: MouseDivEvent
  onClose: () => void
  bounderStyle?: CSS.Properties
  style?: CSS.Properties
}

function ContextMenu({ event, children, onClose, bounderStyle, style }: Props) {
  const classes = useJSS()
  const cmRef = useRef<HTMLDivElement>(null)
  const [location, setLocation] = useState(getLocation(event, cmRef))
  useEffect(() => {
    setLocation(getLocation(event, cmRef))
  }, [event])
  return (
    <div className={classes.Bounder}
      onPointerDown={onClose}
      style={bounderStyle}
    >
      <div className={classes.ContextMenu}
        style={Object.assign({
          top: location.top,
          left: location.left,
        }, style)}
        ref={cmRef}
        onPointerDown={e => { e.stopPropagation() }}
      >
        { children }
      </div>
    </div>
  )
}

export default ContextMenu