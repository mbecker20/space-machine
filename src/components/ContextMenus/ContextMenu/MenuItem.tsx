import React from 'react'
import CSS from 'csstype'

interface Props {
  style: CSS.Properties
  text: string
  onClick?: () => void
}

function MenuItem({ style }: Props) {
  return (
    <div
      style={style}
    >
      
    </div>
  )
}

export default MenuItem