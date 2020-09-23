import React from 'react'
import trashSVG from '../../icons/trash.svg'
import CSS from 'csstype'

interface Props {
  className?: string
  style?: CSS.Properties
  alt: string
}

function TrashSVG({ className, style, alt }: Props) {
  return (
    <img className={className}
      style={style}
      src={trashSVG}
      alt={alt}
    />
  )
}

export default TrashSVG