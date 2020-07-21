import React, { useState } from 'react'
import useJSS from './style'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import DrawerRouteLink from './DrawerRouteLink'
import { SourceModules, EffectModules, UtilityModules } from './ModuleIcons/all'
import { HorizontalScrollDiv } from '../all'

const SOURCES = 'sources'
const EFFECTS = 'effects'
const UTILITY = 'utility'

function RightDrawer() {
  const classes = useJSS()
  const [open, setOpen] = useState(true)
  const closed = '-' + sizes.rightDrawer.width
  const drawerSpring = useSpring({
    right: open ? '0vw' : closed,
    config: {
      tension: 220,
      clamp: true,
    }
  })
  const [selectedRoute, setSR] = useState(SOURCES)
  return (
    <animated.div className={classes.DrawerBounder} style={drawerSpring}>
      <div className={classes.Toggle} onClick={() => {setOpen(!open)}}>
        <div className={classes.ToggleLine} onClick={() => {setOpen(!open)}}/>
      </div>
      <div className={classes.Drawer}>
        <HorizontalScrollDiv className={classes.DrawerHeader}>
          <DrawerRouteLink
            className={classes.DrawerHeaderItem} 
            text={SOURCES}
            onClick={() => {setSR(SOURCES)}}
            selectedRoute={selectedRoute}
          />
          <DrawerRouteLink
            className={classes.DrawerHeaderItem} 
            text={EFFECTS} 
            onClick={() => {setSR(EFFECTS)}}
            selectedRoute={selectedRoute}
          />
          <DrawerRouteLink 
            className={classes.DrawerHeaderItem} 
            text={UTILITY} 
            onClick={() => {setSR(UTILITY)}}
            selectedRoute={selectedRoute}
          />
        </HorizontalScrollDiv>
        <div className={classes.ItemRouter}>
          {
            selectedRoute === SOURCES
            ?
            <SourceModules />
            :
            selectedRoute === EFFECTS
            ?
            <EffectModules />
            :
            selectedRoute === UTILITY
            ?
            <UtilityModules />
            :
            null
          }
        </div>
      </div>
    </animated.div>
  )
}

export default RightDrawer