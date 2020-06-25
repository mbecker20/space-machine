import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'

interface Props {

}

function LeftDrawer() {
  const classes = useJSS()
  const [isOpen, setOpen] = useState(false)
  const springStyle = useSpring({

  })
  return (
    <animated.div className={classes.LeftDrawer}>
      
    </animated.div>
  );
}

export default LeftDrawer