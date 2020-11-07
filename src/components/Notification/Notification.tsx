import React, { useState } from 'react'
import { makeNotificationData } from './makeData'
import useJSS from './style'
import { useSpring, animated } from 'react-spring'
import Conditional from '../Conditional/Conditional'

declare global {
  interface Window {
    flashNotification: (color: string, text: string) => void
  }
}

const notificationTime = 2500 //milliseconds

function Notification() {
  const [{ isOpen, color, text }, setNotificationData] = useState(makeNotificationData(false))
  const [isVisible, setIsVisible] = useState(false)
  const classes = useJSS()
  window.flashNotification = (color, text) => { 
    setNotificationData(makeNotificationData(true, color, text))
    setIsVisible(true)
    window.setTimeout(() => {
      setIsVisible(false)
    }, notificationTime)
  }
  const spring = useSpring({
    opacity: isVisible ? 1 : 0,
    onRest: () => { if (!isOpen) setNotificationData(makeNotificationData(false)) }
  })
  return (
    <Conditional showIf={isOpen}>
      <animated.div className={classes.Notification}
        style={Object.assign({ backgroundColor: color }, spring)}
      >
        {text}
      </animated.div>
    </Conditional>
  )
}

export default Notification