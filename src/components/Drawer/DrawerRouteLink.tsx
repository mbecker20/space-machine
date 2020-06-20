import React from 'react'
import { Link } from '@reach/router'
import { animated, useSpring } from 'react-spring'
import { colors } from '../../theme/theme'

interface Props {
  className: string
  to: string
  text: string
  onClick: () => void
  selectedRoute: string
}

const AnimLink = animated(Link)

function DrawerRouteLink({ className, to, text, onClick, selectedRoute }: Props) {
  const linkStyle = useSpring({
    color: (selectedRoute === text) ? colors.selectedText : colors.text,
    config: {
      tension: 260,
      clamp: true,
    }
  })
  return (
    <AnimLink to={to} className={className} onClick={onClick} style={linkStyle}>
      {text}
    </AnimLink>
  );
}

export default DrawerRouteLink