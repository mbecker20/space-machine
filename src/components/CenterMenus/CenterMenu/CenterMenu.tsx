import React from 'react'
import useJSS from './style'

interface Props {
  children: React.ReactNode
  header: string
  onClose: () => void
}

function CenterMenu({ children, header, onClose }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.CenterMenuBounder}
      onPointerDown={e => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div className={classes.CenterMenu}
        onPointerDown={(e) => {e.stopPropagation()}} 
      >
        <div className={classes.Header}>
          {header}
        </div>
        {children}
      </div>
    </div>
  )
}

export default CenterMenu