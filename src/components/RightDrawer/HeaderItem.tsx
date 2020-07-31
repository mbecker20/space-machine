import React from 'react'
import { colors } from '../../theme/theme'

interface Props {
  className: string
  text: string
  onClick: () => void
  selectedRoute: string
}

function HeaderItem({ className, text, onClick, selectedRoute }: Props) {
  const linkStyle = {
    color: (selectedRoute === text) ? colors.selectedText : colors.text,
  }
  return (
    <div className={className} onClick={onClick} style={linkStyle}>
      {text}
    </div>
  )
}

export default HeaderItem