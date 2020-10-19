import React, { useState, useRef, useEffect } from 'react'
import useJSS from './style'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import HeaderItem from './HeaderItem'
import { clamp } from '../../helpers/genFuncs'
import SpaceDBMenu from './SpaceDBMenu'
import FileMenu from './FileMenu/FileMenu'

const SPACEDB_PROJECTS = 'spaceDB projects'
const FILE = 'file'

let drawerWidth = `${sizes.rightDrawer.width}`

const addPx = (arg: string) => `${arg}px`

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
  const [selectedRoute, setSR] = useState(window.usingElectron ? SPACEDB_PROJECTS : FILE)
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)
  const drawerHeaderRef = useRef<HTMLDivElement>(null)
  const itemRouterRef = useRef<HTMLDivElement>(null)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  let adjusting = false
  const [, toReRender ] = useState({})
  useEffect(() => {
    window.addEventListener('resize', () => {
      window.setTimeout(() => { toReRender({}) }, 500) 
    })
  }, [])
  return (
    <animated.div className={classes.DrawerBounder} style={drawerSpring} onPointerDown={e => e.stopPropagation()}>
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
            drawerWidth = `${clamp(vw - e.clientX, [150, 700] )}`
            if (drawerRef.current) { drawerRef.current.style.width = addPx(drawerWidth) }
            if (drawerHeaderRef.current) { drawerHeaderRef.current.style.width = addPx(drawerWidth) }
            if (itemRouterRef.current) { itemRouterRef.current.style.width = addPx(drawerWidth) }
            if (toggleRef.current) { toggleRef.current.style.right = addPx(drawerWidth) }
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
          {!window.usingElectron ? null : 
          <HeaderItem
            className={classes.DrawerHeaderItem}
            text={SPACEDB_PROJECTS}
            onClick={() => { setSR(SPACEDB_PROJECTS) }}
            selectedRoute={selectedRoute}
          />}
          <HeaderItem
            className={classes.DrawerHeaderItem}
            text={FILE}
            onClick={() => { setSR(FILE) }}
            selectedRoute={selectedRoute}
          />
        </div>
        <div className={classes.ItemRouter} ref={itemRouterRef}>
          {
            selectedRoute === SPACEDB_PROJECTS
            ?
            <SpaceDBMenu />
            :
            selectedRoute === FILE
            ?
            <FileMenu />
            :
            null
          }
        </div>
      </div>
    </animated.div>
  )
}

export default RightDrawer