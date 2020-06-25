import React, { useState } from 'react'
import useJSS from './style'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import { Router } from '@reach/router'
import DrawerRouteLink from './DrawerRouteLink'
import BaseModules from './ModuleIcons/BaseModules'
import { HorizontalScrollDiv } from '../all'

function RightDrawer() {
  const classes = useJSS()
  const [open, setOpen] = useState(true)
  const closed = '-' + sizes.rightDrawer.width
  const drawerSpring = useSpring({
    right: open ? '0px' : closed,
    config: {
      tension: 220,
      clamp: true,
    }
  })
  const [selectedRoute, setSR] = useState('')
  return (
    <animated.div className={classes.DrawerBounder} style={drawerSpring}>
      <div className={classes.Toggle} onClick={() => {setOpen(!open)}}>
        <div className={classes.ToggleLine} onClick={() => {setOpen(!open)}}/>
      </div>
      <div className={classes.Drawer}>
        <HorizontalScrollDiv className={classes.DrawerHeader}>
          <DrawerRouteLink
            className={classes.DrawerHeaderItem} 
            to='baseModules'
            text='base modules' 
            onClick={() => {setSR('base modules')}}
            selectedRoute={selectedRoute}
          />
          <DrawerRouteLink 
            className={classes.DrawerHeaderItem} 
            to='higherOrder' 
            text='higher order' 
            onClick={() => {setSR('higher order')}}
            selectedRoute={selectedRoute}
          />
          <DrawerRouteLink 
            className={classes.DrawerHeaderItem} 
            to='settings' 
            text='settings' 
            onClick={() => {setSR('settings')}}
            selectedRoute={selectedRoute}
          />
        </HorizontalScrollDiv>
        <Router className={classes.ItemRouter}>
          <BaseModules path='baseModules'/>
        </Router>
      </div>
    </animated.div>
  )
}

export default RightDrawer