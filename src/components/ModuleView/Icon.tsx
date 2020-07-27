import React, { useState, Fragment } from 'react'
import { Module, RootState } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { moveModule } from '../../redux/allActions'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import { ArcherElement } from 'react-archer'
import ControlMenu from '../LargeIconInfo/ControlMenu'
import InputOutputView from '../LargeIconInfo/controls/InputOutputView'
import MarkContainerIO from '../LargeIconInfo/MarkContainerIO'
import DeleteButton from '../LargeIconInfo/DeleteButton'
import Knob from '../Knob/Knob'

declare global {
  interface Window {
    currSetHighlighted: (setHighlighted: boolean) => void
  }
}

window.currSetHighlighted = () => {}

interface Props {
  mod: Module
  gridCol: number
  gridRow: number
}

function ModuleViewIcon({ mod, gridCol, gridRow }: Props) {
  const classes = useJSS()
  const [isHighlighted, setHighlighted] = useState(mod.id === window.highlightedID)
  const [reRender, toReRender] = useState(false)
  function reRenderIcon() {
    toReRender(!reRender)
  }
  if (mod.id === window.highlightedID) {
    window.currSetHighlighted = setHighlighted
  }
  const iconStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
    borderStyle: isHighlighted ? 'solid' : 'none',
  }
  const archerElementStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
  }
  
  const iconSpring0 = useSpring({
    width: isHighlighted ? sizes.moduleView.bigIconWidth : sizes.moduleView.icon,
    height: isHighlighted ? sizes.moduleView.bigIconHeight : sizes.moduleView.icon,
    config: {
      tension: 550,
      clamp: true,
    },
    onFrame: window.refreshArcherContainer
  })
  const iconSpring1 = useSpring({
    zIndex: isHighlighted ? 3 : 2,
    config: { duration: 0 }
  })

  const nameSpring = useSpring({
    fontSize: isHighlighted ? sizes.text.medium : sizes.text.small,
    config: {
      tension: 550,
      clamp: true
    }
  })
  
  const [ modules, baseContainerID ] = useSelector((state: RootState) => [ state.modules, state.baseContainerID ])
  const dispatch = useDispatch()
  const [ knobVal, setKnobVal ] = useState(20)
  return (
    <Fragment>
      <animated.div 
        className={classes.Icon} 
        style={Object.assign(iconSpring1, iconSpring0, iconStyle)}
        onDragOver={event => {
          event.preventDefault()
        }}
        onDrop={e => {
          const id = e.dataTransfer.getData('id')
          if (id) {
            const possiblyMod = modules[id]
            if (possiblyMod) {
              const fromRow = e.dataTransfer.getData('fromRow')
              const fromCol = e.dataTransfer.getData('fromCol')
              window.setFillIsExpanded(false)
              dispatch(moveModule(id, mod.row, mod.col))
              dispatch(moveModule(mod.id, Number(fromRow), Number(fromCol)))
              window.setTimeout(window.refreshArcherContainer, 100)
            }
          } else {
            if (mod.connectionInputs.length === 0 && window.audioModules[mod.id].connectingParamIDs.length === 0) {
              alert('mod cannot accept input')
            } else {
              const fromID = e.dataTransfer.getData('fromID')
              if (fromID) {
                window.openConnectionMenu(fromID, mod.id)
              }
            }
          }
          setHighlighted(false)
        }}
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('id', mod.id)
          event.dataTransfer.setData('fromRow', `${mod.row}`)
          event.dataTransfer.setData('fromCol', `${mod.col}`)
          window.setFillIsExpanded(true)
        }}
        onDragEnd={() => {
          window.setFillIsExpanded(false)
        }}
        onClick={e => {
          if (e.stopPropagation) {
            e.stopPropagation()
          }
          if (mod.id === window.highlightedID) {
            setHighlighted(false)
            window.highlightedID = ''
            window.currSetHighlighted = (setHighlighted) => {}
          } else {
            setHighlighted(true)
            window.highlightedID = mod.id
            window.currSetHighlighted(false)
            window.currSetHighlighted = setHighlighted
          }
        }}
      >
        {mod.connectionOutputs.length === 0 ? null
        :
        <div className={classes.IconConnector}
          draggable={true}
          onDragStart={(e) => {
            e.stopPropagation()
            e.dataTransfer.setData('fromID', mod.id)
          }}
        />}
        <animated.div className={classes.IconName} style={nameSpring} onClick={e => {
          if (isHighlighted) {
            e.stopPropagation()
            window.openRenameMenu(mod.id)
          }
        }}>
          {mod.name}
        </animated.div>
        {isHighlighted ? 
        <div onClick={e => e.stopPropagation()}
          style={{ 
            width: sizes.moduleView.bigIconWidth, 
            maxHeight: sizes.moduleView.bigIconHeight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}
        >
          <Knob initValue={knobVal} range={[0, 50]} onChange={(newVal) => { setKnobVal(newVal) }}/>
          <InputOutputView selectedModule={mod} modules={modules} />
          <ControlMenu audioModule={window.audioModules[mod.id]} selectedModule={mod} reRenderIcon={reRenderIcon}/>
          <MarkContainerIO baseContainerID={baseContainerID} selectedModule={mod} />
          <DeleteButton selectedModule={mod} />
        </div>
        : null}
      </animated.div>
      <animated.div className={classes.ArcherElement}
        style={Object.assign({}, iconSpring0, archerElementStyle)}
      >
        <div style={{
          gridColumn: `${1} / span 1`,
          gridRow: `${1} / span 1`,
        }}>
          <ArcherElement
            id={mod.id + ' input'}
          >
            <div style={{
              width: '10px',
              height: '10px',
              //backgroundColor: 'blue',
            }}></div>
          </ArcherElement>
        </div>
        <div style={{
          gridColumn: `${1} / span 1`,
          gridRow: `${3} / span 1`,
        }}>
          <ArcherElement
            id={mod.id + ' controls'}
          >
            <div style={{
              width: '10px',
              height: '10px',
              //backgroundColor: 'yellow',
            }}></div>
          </ArcherElement>
        </div>
        <div style={{
          gridColumn: `${3} / span 1`,
          gridRow: `${1} / span 1`,
        }}>
          <ArcherElement
            id={mod.id + ' output'}
            relations={mod.outputs.map(outputData => {
              const { connectedID, param } = outputData
              return {
                targetId: param === '' ? connectedID + ' input' : connectedID + ' controls',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: {
                  strokeColor: param === '' ? 'red' : 'blue',
                  strokeWidth: param === '' ? 1 : 1,
                }
              }
            })}
          >
            <div style={{
              width: '10px',
              height: '10px',
            }} />
          </ArcherElement>
        </div>
      </animated.div>
    </Fragment>
  )
}

export default ModuleViewIcon