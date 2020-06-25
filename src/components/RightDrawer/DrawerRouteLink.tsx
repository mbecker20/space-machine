import React from 'react'
//import { animated, useSpring } from 'react-spring'
import { colors } from '../../theme/theme'

interface Props {
  className: string
  text: string
  onClick: () => void
  selectedRoute: string
}

function DrawerRouteLink({ className, text, onClick, selectedRoute }: Props) {
  const linkStyle = {
    color: (selectedRoute === text) ? colors.selectedText : colors.text,
  }
  /*
  const linkStyle = useSpring({
    color: (selectedRoute === text) ? colors.selectedText : colors.text,
    config: {
      tension: 300,
      clamp: true,
    }
  })
  */
  return (
    <div className={className} onClick={onClick} style={linkStyle}>
      {text}
    </div>
  );
}

export default DrawerRouteLink