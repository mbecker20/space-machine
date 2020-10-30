import React, { ReactNode, RefObject } from 'react'
import useJSS from './style'
import CSS from 'csstype'

export type Location = { top: number, left: number }

interface Props {
  children: ReactNode
  onClose: () => void
  bounderStyle?: CSS.Properties
  style?: CSS.Properties
  location: Location
  cmRef: RefObject<HTMLDivElement>
}

function ContextMenu({ children, onClose, bounderStyle, style, location, cmRef }: Props) {
  const classes = useJSS()
  
  return (
    <div className={classes.ContextMenuBounder}
      onPointerDown={onClose}
      style={bounderStyle}
    >
      <div className={classes.ContextMenu}
        style={Object.assign({
          top: location.top,
          left: location.left,
          opacity: 1,
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