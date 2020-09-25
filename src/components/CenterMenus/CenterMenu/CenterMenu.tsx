import React from 'react'
import useJSS from './style'
import CSS from 'csstype'
import { animated } from 'react-spring'

interface Props {
  className?: string
  style?: CSS.Properties
  headerClassName?: string
  headerStyle?: CSS.Properties
  children: React.ReactNode
  header?: string
  onClose: () => void
  bounderStyle?: CSS.Properties
}

function CenterMenu({ className, style, headerClassName, headerStyle, children, header, onClose, bounderStyle }: Props) {
  const classes = useJSS()
  return (
    <animated.div className={classes.CenterMenuBounder}
      onPointerDown={e => {
        e.stopPropagation()
        onClose()
      }}
      style={bounderStyle}
    >
      <div className={className ? `${classes.CenterMenu} ${className}` : classes.CenterMenu}
        onPointerDown={(e) => {e.stopPropagation()}}
        style={style}
      >
        {!header ? null : 
        <div className={headerClassName ? `${classes.Header} ${headerClassName}` : classes.Header}
          style={headerStyle}
        >
          {header}
        </div>}
        {children}
      </div>
    </animated.div>
  )
}

export default CenterMenu