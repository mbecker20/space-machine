import React, { useState, Fragment } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'
import { useSelector } from 'react-redux'
import { HorizontalScrollDiv, RenameMenu } from '../all'
import { RootState } from '../../redux/stateTSTypes'
import DeleteButton from './DeleteButton'
import InputOutputView from './InputOutputView'
import MarkContainerIO from './MarkContainerIO'
import ControlMenu from './ControlMenu'

declare global {
  interface Window {
    setLeftDrawerOpen: (isOpen: boolean) => void
    reRenderLeftDrawer: () => void
  }
}

function LeftDrawer() {
  const classes = useJSS()
  const [isOpen, setOpen] = useState(false)
  window.setLeftDrawerOpen = setOpen
  const springStyle = useSpring({
    width: isOpen ? sizes.leftDrawer.width : '0vw',
    config: {
      tension: 300,
      velocity: 10,
      clamp: true,
    }
  })
  const [isRenameMenuOpen, setRMOpen] = useState(false)
  const [ modules, baseContainerID ] = useSelector((state: RootState) => [state.modules, state.baseContainerID])
  const selectedModule = modules[window.highlightedID]
  const am = window.audioModules
  const audioModule = am[window.highlightedID]
  const [toReRender, setReRender] = useState(false)
  window.reRenderLeftDrawer = () => {setReRender(!toReRender)}
  return (
    <Fragment>
      <animated.div className={classes.LeftDrawer} style={springStyle}>
        <div className={classes.TopItems}>
          <HorizontalScrollDiv className={classes.HeaderScrollBounder}>
            <div className={classes.DrawerHeader} onClick={() => {
              setRMOpen(true)
            }}>
              {selectedModule ? selectedModule.name : null}
            </div>
          </HorizontalScrollDiv>
          <InputOutputView selectedModule={selectedModule} modules={modules}/>
        </div>
        <ControlMenu audioModule={audioModule} selectedModule={selectedModule} key={selectedModule.id}/>
        <div className={classes.BottomItems}>
          <MarkContainerIO baseContainerID={baseContainerID} selectedModule={selectedModule}/>
          <DeleteButton selectedModule={selectedModule} audioModule={audioModule} />
        </div>
      </animated.div>
      {!isRenameMenuOpen ? null :
      <RenameMenu setRMOpen={setRMOpen}/>}
    </Fragment>
  )
}

export default LeftDrawer