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
    <div className={classes.CenterMenu} onKeyUp={(e) => {
      if (e.keyCode === 27 ) { //escape
        onClose()
      }
    }}>
      <div className={classes.Header}>
        {header}
      </div>
      {children}
    </div>
  )
}

export default CenterMenu