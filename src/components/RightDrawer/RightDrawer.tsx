import React, { useState } from 'react'
import useJSS from './style'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
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
  const [selectedRoute, setSR] = useState('base modules')
  return (
    <animated.div className={classes.DrawerBounder} style={drawerSpring}>
      <div className={classes.Toggle} onClick={() => {setOpen(!open)}}>
        <div className={classes.ToggleLine} onClick={() => {setOpen(!open)}}/>
      </div>
      <div className={classes.Drawer}>
        <HorizontalScrollDiv className={classes.DrawerHeader}>
          <DrawerRouteLink
            className={classes.DrawerHeaderItem} 
            text='base modules'
            onClick={() => {setSR('base modules')}}
            selectedRoute={selectedRoute}
          />
          <DrawerRouteLink
            className={classes.DrawerHeaderItem} 
            text='higher order' 
            onClick={() => {setSR('higher order')}}
            selectedRoute={selectedRoute}
          />
          <DrawerRouteLink 
            className={classes.DrawerHeaderItem} 
            text='settings' 
            onClick={() => {setSR('settings')}}
            selectedRoute={selectedRoute}
          />
        </HorizontalScrollDiv>
        <div className={classes.ItemRouter}>
          {
            selectedRoute === 'base modules' ?
            <BaseModules /> :
            selectedRoute === 'higher order' ?
            <div/> :
            selectedRoute === 'settings' ?
            <div/> :
            null
          }
        </div>
      </div>
    </animated.div>
  )
}

export default RightDrawer