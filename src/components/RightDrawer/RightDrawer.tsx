import React, { useState, useRef } from 'react'
import useJSS from './style'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import ModuleGroup from './DrawerRouteLink'
import { sourceModuleData, effectModuleData, utilityModuleData } from './ModuleIcons/moduleData'
import { clamp } from '../../helpers/genFuncs'
import ModuleIcons from './ModuleIcons/ModuleIcons'

const SOURCES = 'sources'
const EFFECTS = 'effects'
const UTILITY = 'utility'

let drawerWidth = sizes.rightDrawer.width

function RightDrawer() {
  const classes = useJSS()
  const [open, setOpen] = useState(true)
  const [width, setWidth] = useState(drawerWidth)
  const drawerSpring = useSpring({
    transform: open ? 'translate(0px, 0px)' : `translate(${width}px, 0px)`,
    config: {
      tension: 220,
      clamp: true,
    }
  })
  const [selectedRoute, setSR] = useState(SOURCES)
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)
  const drawerHeaderRef = useRef<HTMLDivElement>(null)
  const itemRouterRef = useRef<HTMLDivElement>(null)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  let adjusting = false
  return (
    <animated.div className={classes.DrawerBounder} style={drawerSpring}>
      <div className={classes.Toggle}
        ref={toggleRef}
        onPointerDown={e => {
          if (open && e.shiftKey) {
            adjusting = true
            toggleRef.current?.setPointerCapture(e.pointerId)
          } else {
            setOpen(!open)
          }
        }}
        onPointerMove={e => {
          if (adjusting) {
            drawerWidth = `${clamp(vw - e.clientX, [150, 700] )}px`
            if (drawerRef.current) { drawerRef.current.style.width = drawerWidth }
            if (drawerHeaderRef.current) { drawerHeaderRef.current.style.width = drawerWidth }
            if (itemRouterRef.current) { itemRouterRef.current.style.width = drawerWidth }
            if (toggleRef.current) { toggleRef.current.style.right = drawerWidth }
          }
        }}
        onPointerUp={e => {
          if (adjusting) {
            adjusting = false
            setWidth(drawerWidth)
            toggleRef.current?.releasePointerCapture(e.pointerId)
          }
        }}
      >
        <div className={classes.ToggleLine} onClick={() => {setOpen(!open)}}/>
      </div>
      <div className={classes.Drawer} ref={drawerRef}>
        <div className={classes.DrawerHeader} ref={drawerHeaderRef}
          onWheel={e => {
            if (drawerHeaderRef && drawerHeaderRef.current) {
              drawerHeaderRef.current.scrollLeft += e.deltaY
            }
          }}
        >
          <ModuleGroup
            className={classes.DrawerHeaderItem} 
            text={SOURCES}
            onClick={() => {setSR(SOURCES)}}
            selectedRoute={selectedRoute}
          />
          <ModuleGroup
            className={classes.DrawerHeaderItem} 
            text={EFFECTS} 
            onClick={() => {setSR(EFFECTS)}}
            selectedRoute={selectedRoute}
          />
          <ModuleGroup 
            className={classes.DrawerHeaderItem} 
            text={UTILITY} 
            onClick={() => {setSR(UTILITY)}}
            selectedRoute={selectedRoute}
          />
        </div>
        <div className={classes.ItemRouter} ref={itemRouterRef}>
          {
            selectedRoute === SOURCES
            ?
            <ModuleIcons moduleData={sourceModuleData} />
            :
            selectedRoute === EFFECTS
            ?
            <ModuleIcons moduleData={effectModuleData} />
            :
            selectedRoute === UTILITY
            ?
            <ModuleIcons moduleData={utilityModuleData} />
            :
            null
          }
        </div>
      </div>
    </animated.div>
  )
}

export default RightDrawer