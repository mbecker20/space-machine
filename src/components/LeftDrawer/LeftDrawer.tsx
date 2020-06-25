import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'

declare global {
  interface Window { 
    setLeftDrawerOpen: (isOpen: boolean) => void 
    setLeftDrawerTopText: (text: string) => void 
  }
}

interface Props {

}

function LeftDrawer() {
  const classes = useJSS()
  const [isOpen, setOpen] = useState(false)
  window.setLeftDrawerOpen = setOpen
  const [topText, setTopText] = useState(window.highlightedID)
  window.setLeftDrawerTopText = setTopText
  const springStyle = useSpring({
    width: isOpen ? sizes.leftDrawer.width : '0px',
    config: {
      tension: 300,
      velocity: 10,
      clamp: true,
    }
  })
  return (
    <animated.div className={classes.LeftDrawer} style={springStyle}>
      {topText}
    </animated.div>
  )
}

export default LeftDrawer