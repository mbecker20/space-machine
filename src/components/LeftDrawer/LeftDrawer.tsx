import React, { useState, Fragment } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'
import { useSelector } from 'react-redux'
import { HorizontalScrollDiv } from '../all'
import RenameMenu from '../RenameMenu/RenameMenu'
import { RootState } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import { AudioModuleWithTypes } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl } from './controls/all'
import DeleteButton from './DeleteButton'
import InputOutputView from './InputOutputView'

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
  const modules = useSelector((state: RootState) => state.modules)
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
        <div className={classes.ControlMenu}>
          <div className={classes.MenuHeader}>controls</div>
          {audioModule ? Object.keys(audioModule.controlData).map((controlID, index) => {
            const { controlType, paramID, value, range } = audioModule.controlData[controlID]
            const setFunc = audioModule.controlSetFuncs[controlID]
            return (
              <div className={classes.ControlBounder} key={selectedModule.id + index}>
                {controlType === VALUE
                ?
                <ValueControl controlID={controlID} value={value} audioModule={audioModule} range={range} paramID={paramID} setFunc={setFunc}/>
                :
                controlType === BUTTON
                ?
                <ButtonControl setFunc={setFunc} controlID={controlID} />
                :
                controlType === TYPE
                ?
                <TypeControl setFunc={setFunc} audioModule={audioModule as AudioModuleWithTypes} value={value} selectedModule={selectedModule} />
                :
                controlType === FILE
                ?
                <FileControl controlID={controlID} setFunc={setFunc} />
                :
                controlType === SWITCH
                ?
                <SwitchControl controlID={controlID} setFunc={setFunc} />
                :
                null
                }
              </div>
            )
          }) : null}
        </div>
        <div className={classes.BottomItems}>
          <DeleteButton selectedModule={selectedModule} audioModule={audioModule} />
        </div>
      </animated.div>
      {!isRenameMenuOpen ? null :
      <RenameMenu setRMOpen={setRMOpen}/>}
    </Fragment>
  )
}

export default LeftDrawer