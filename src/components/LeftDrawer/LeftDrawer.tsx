import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'
import { useDispatch, useSelector } from 'react-redux'
import { removeModule, removeConnection } from '../../redux/allActions'
import { HorizontalScrollDiv } from '../all'
import RenameMenu from './RenameMenu'
import { RootState } from '../../redux/stateTSTypes'
import { disconnect } from '../../audioModules/connection'
import { ConnectingAudioModule } from '../../audioModules/moduleTypes'

declare global {
  interface Window { 
    setLeftDrawerOpen: (isOpen: boolean) => void 
    setLeftDrawerTopText: (text: string) => void 
  }
}

function LeftDrawer() {
  const classes = useJSS()
  const [isOpen, setOpen] = useState(false)
  window.setLeftDrawerOpen = setOpen
  const [topText, setTopText] = useState(window.highlightedID)
  window.setLeftDrawerTopText = setTopText
  const springStyle = useSpring({
    width: isOpen ? sizes.leftDrawer.width : '0vw',
    config: {
      tension: 300,
      velocity: 10,
      clamp: true,
    }
  })
  const dispatch = useDispatch()
  const [isRenameMenuOpen, setRMOpen] = useState(false)
  const selectedModule = useSelector((state: RootState) => state.modules[window.highlightedID])
  const am = window.audioModules
  return (
    <React.Fragment>
      <animated.div className={classes.LeftDrawer} style={springStyle}>
        <div className={classes.TopItems}>
          <HorizontalScrollDiv className={classes.HeaderScrollBounder}>
            <div className={classes.DrawerHeader} onClick={() => {
              setRMOpen(true)
            }}>
              {topText}
            </div>
          </HorizontalScrollDiv>
          {selectedModule.inputs.length === 0 ? null : <div>inputs</div>}
          {selectedModule.inputs.map((inputData, key) => {
            return (
              <div key={inputData[0] + key}
                onClick={() => {
                  dispatch(removeConnection(inputData[0], selectedModule.id, inputData[1]))
                  disconnect(am[inputData[0]] as ConnectingAudioModule, am[selectedModule.id], inputData[1])
                }}
              >{inputData[1].length === 0 ? inputData[0] : `${inputData[0]} - ${inputData[1]}`}</div>
            )
          })}
          {selectedModule.outputs.length === 0 ? null : <div>outputs</div>}
          {selectedModule.outputs.map((outputData, key) => {
            return (
              <div key={outputData[0] + key}
                onClick={() => {
                  dispatch(removeConnection(selectedModule.id, outputData[0], outputData[1]))
                  disconnect(am[selectedModule.id] as ConnectingAudioModule, am[outputData[0]], outputData[1])
                }}
              >{outputData[1].length === 0 ? outputData[0] : `${outputData[0]} - ${outputData[1]}`}</div>
            )
          })}
        </div>
        {am[window.highlightedID] ? Object.keys(am[window.highlightedID].controls).map(controlID => {
          return (
            <div>{controlID}</div>
          )
        }) : null}
        <div className={classes.BottomItems}>
          <div className={classes.Delete}
            onClick={() => {
              window.setLeftDrawerOpen(false)
              dispatch(removeModule(window.highlightedID))
              window.highlightedID = ''
            }}
          >delete</div>
        </div>
      </animated.div>
      {!isRenameMenuOpen ? null :
      <RenameMenu setRMOpen={setRMOpen} setTopText={setTopText}/>}
    </React.Fragment>
  )
}

export default LeftDrawer