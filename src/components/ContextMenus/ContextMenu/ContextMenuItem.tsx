import React from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  className?: string
  style?: CSS.Properties
  text: string
  onClick?: () => void
}

function ContextMenuItem({ className, style, text, onClick }: Props) {
  const classes = useJSS()
  return (
    <div className={className ? `${classes.MenuItem} ${className}` : classes.MenuItem}
      style={style}
      onClick={onClick}
    >
      {text}
    </div>
  )
}

export default ContextMenuItem