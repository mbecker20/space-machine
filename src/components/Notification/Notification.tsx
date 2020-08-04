import React, { Fragment, useState } from 'react'
import { makeNotificationData } from './makeData'
import useJSS from './style'
import { useSpring, animated } from 'react-spring'

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
    window.setTimeout(() => {
      setNotificationData(makeNotificationData(false))
    }, notificationTime + 700)
  }
  const spring = useSpring({
    opacity: isVisible ? 1 : 0
  })
  return (
    <Fragment>
      {
        !isOpen ? null :
        <animated.div className={classes.Notification}
          style={Object.assign({ backgroundColor: color }, spring)}
        >
          {text}
        </animated.div>
      }
    </Fragment>
  )
}

export default Notification