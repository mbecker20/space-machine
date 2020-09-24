import React from 'react'
import useJSS from './style'
import CSS from 'csstype'

interface Props {
  className?: string
  style?: CSS.Properties
  headerClassName?: string
  headerStyle?: CSS.Properties
  children: React.ReactNode
  header: string
  onClose: () => void
  bounderStyle?: CSS.Properties
}

function CenterMenu({ className, style, headerClassName, headerStyle, children, header, onClose, bounderStyle }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.CenterMenuBounder}
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
        <div className={headerClassName ? `${classes.Header} ${headerClassName}` : classes.Header}
          style={headerStyle}
        >
          {header}
        </div>
        {children}
      </div>
    </div>
  )
}

export default CenterMenu