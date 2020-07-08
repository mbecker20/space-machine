import React, { useState, Fragment } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { colors, sizes } from '../../theme/theme'
import { useDispatch, useSelector } from 'react-redux'
import { removeModule, removeConnection } from '../../redux/allActions'
import { HorizontalScrollDiv, Button } from '../all'
import RenameMenu from './RenameMenu'
import { RootState } from '../../redux/stateTSTypes'
import { disconnect } from '../../audioModules/connection'
import { ConnectingAudioModule, TYPE, BUTTON, VALUE } from '../../audioModules/moduleTypes'
import { AudioModuleWithTypes } from '../../audioModules/moduleTypes'

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
  const dispatch = useDispatch()
  const [isRenameMenuOpen, setRMOpen] = useState(false)
  const modules = useSelector((state: RootState) => state.modules)
  const selectedModule = modules[window.highlightedID]
  const am = window.audioModules
  const audioModule = am[window.highlightedID]
  const [toReRender, setReRender] = useState(false)
  window.reRenderLeftDrawer = () => {setReRender(!toReRender)}
  return (
    <React.Fragment>
      <animated.div className={classes.LeftDrawer} style={springStyle}>
        <div className={classes.TopItems}>
          <HorizontalScrollDiv className={classes.HeaderScrollBounder}>
            <div className={classes.DrawerHeader} onClick={() => {
              setRMOpen(true)
            }}>
              {selectedModule ? selectedModule.name : null}
            </div>
          </HorizontalScrollDiv>
          {!selectedModule ? null : selectedModule.inputs.length === 0 ? null : 
            <div className={classes.MenuHeader}>inputs</div>
          }
          {!selectedModule ? null : selectedModule.inputs.map((inputData, key) => {
            const name = modules[inputData[0]].name
            return (
              <div className={classes.Connection}
                key={inputData[0] + key}
                onClick={() => {
                  dispatch(removeConnection(inputData[0], selectedModule.id, inputData[1]))
                  disconnect(am[inputData[0]] as ConnectingAudioModule, am[selectedModule.id], inputData[1])
                }}
              >
                {inputData[1].length === 0 ? name : `${name} - ${inputData[1]}`}
              </div>
            )
          })}
          {!selectedModule ? null : selectedModule.outputs.length === 0 ? null :
            <div className={classes.MenuHeader}>outputs</div>
          }
          {!selectedModule ? null : selectedModule.outputs.map((outputData, key) => {
            const name = modules[outputData[0]].name
            return (
              <div className={classes.Connection}
                key={outputData[0] + key}
                onClick={() => {
                  dispatch(removeConnection(selectedModule.id, outputData[0], outputData[1]))
                  disconnect(am[selectedModule.id] as ConnectingAudioModule, am[outputData[0]], outputData[1])
                }}
              >{outputData[1].length === 0 ? name : `${name} - ${outputData[1]}`}</div>
            )
          })}
        </div>
        <div className={classes.ControlMenu}>
          <div className={classes.MenuHeader}>controls</div>
          {audioModule ? Object.keys(audioModule.controlData).map((controlID, index) => {
            const { controlType, paramID, range } = audioModule.controlData[controlID]
            const setFunc = audioModule.controlSetFuncs[controlID]
            const audioNode = audioModule.audioNode
            return (
              <div className={classes.ControlBounder} key={selectedModule.id + index}>
                {controlType === VALUE
                ?
                <Fragment>
                  <div>{controlID}</div>
                  <input className={classes.ControlInput}
                    type='number'
                    value={audioModule.controlData[controlID].value ? audioModule.controlData[controlID].value : audioNode[paramID].value}
                    min={range ? range[0] : undefined}
                    max={range ? range[1] : undefined}
                    step={!range ? undefined : range[2] ? range[2] : undefined}
                    onChange={(e) => {
                      setFunc(e.target.value)
                      window.reRenderLeftDrawer()
                    }}
                  />
                </Fragment>
                :
                controlType === BUTTON
                ?
                <Button style={{
                    //backgroundColor: colors.fillModule,
                    borderColor: colors.deleteButton,
                    width: '50%',
                  }}
                  onClick={() => {
                    setFunc('')
                  }}
                >{controlID}</Button>
                :
                controlType === TYPE
                ?
                <Fragment>
                  <label htmlFor={'type'}>choose type</label>
                  <select className={classes.ControlTypeSelect}
                    name='type' id='type'
                    onChange={(e) => {
                      setFunc(e.target.value)
                      window.reRenderLeftDrawer()
                    }}
                    value={audioNode.type as string}
                  >
                    {(audioModule as AudioModuleWithTypes).typeTypes.map(type => {
                      return (
                        <option value={type} key={selectedModule.id + type}>{type}</option>
                      )
                    })}
                  </select>
                </Fragment>
                :
                null
                }
              </div>
            )
          }) : null}
        </div>
        <div className={classes.BottomItems}>
          <Button style={{ 
            borderColor: colors.deleteButton,
            //backgroundColor: colors.fillModule,
            width: '50%',
            fontSize: sizes.text.small
          }}
            onClick={() => {
              selectedModule.inputs.forEach(inputData => {
                disconnect(am[inputData[0]] as ConnectingAudioModule, audioModule, inputData[1])
                dispatch(removeConnection(inputData[0], selectedModule.id, inputData[1]))
              })
              selectedModule.outputs.forEach(outputData => {
                disconnect(audioModule as ConnectingAudioModule, am[outputData[0]], outputData[1])
                dispatch(removeConnection(selectedModule.id, outputData[0], outputData[1]))
              })
              dispatch(removeModule(window.highlightedID))
              window.setLeftDrawerOpen(false)
              window.highlightedID = ''
              
            }}
          >delete</Button>
        </div>
      </animated.div>
      {!isRenameMenuOpen ? null :
      <RenameMenu setRMOpen={setRMOpen}/>}
    </React.Fragment>
  )
}

export default LeftDrawer