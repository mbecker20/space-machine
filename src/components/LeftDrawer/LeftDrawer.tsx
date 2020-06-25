import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'
import { useDispatch } from 'react-redux'
import { removeContainer } from '../../redux/allActions'

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
    width: isOpen ? sizes.leftDrawer.width : '0vmin',
    config: {
      tension: 300,
      velocity: 10,
      clamp: true,
    }
  })
  const dispatch = useDispatch()
  return (
    <animated.div className={classes.LeftDrawer} style={springStyle}>
      <div className={classes.TopItems}>
        <div className={classes.DrawerHeader}>{topText}</div>
      </div>
      <div className={classes.BottomItems}>
        <div className={classes.Delete}
          onClick={() => {
            window.setLeftDrawerOpen(false)
            dispatch(removeContainer(window.highlightedID))
            window.highlightedID = ''
          }}
        >delete</div>
      </div>
    </animated.div>
  )
}

export default LeftDrawer