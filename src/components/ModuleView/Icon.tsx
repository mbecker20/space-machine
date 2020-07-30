import React, { useState, Fragment } from 'react'
import { Module, RootState, ContainerModule } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { moveModule } from '../../redux/allActions'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import { ArcherElement } from 'react-archer'
import ControlMenu from '../LargeIcon/ControlMenu'
import InputOutputView from '../LargeIcon/InputOutputView'
import MarkContainerIO from '../LargeIcon/MarkContainerIO'
import DeleteButton from '../LargeIcon/DeleteButton'
import { CONTAINER } from '../../audioModules/moduleTypes'
import ContainerControlMenu from '../LargeIcon/ContainerControlMenu'

declare global {
  interface Window {
    currUnHighlight: () => void
  }
}

window.currUnHighlight = () => {}

interface Props {
  mod: Module
  gridCol: number
  gridRow: number
}

function ModuleViewIcon({ mod, gridCol, gridRow }: Props) {
  const classes = useJSS()
  const [isHighlighted, setHighlighted] = useState(mod.id === window.highlightedID)
  const [controlMenuOpen, setControlMenuOpen] = useState(false)
  const [reRender, toReRender] = useState(false)
  function reRenderIcon() {
    toReRender(!reRender)
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
  
  const iconSpring = useSpring({
    width: isHighlighted ? sizes.moduleView.bigIconWidth : sizes.moduleView.icon,
    height: isHighlighted ? sizes.moduleView.bigIconHeight : sizes.moduleView.icon,
    config: {
      tension: 350,
      clamp: true,
    },
    onFrame: window.refreshArcherContainer,
    onRest: () => { setControlMenuOpen(isHighlighted) }
  })

  const nameSpring = useSpring({
    fontSize: isHighlighted ? sizes.text.medium : sizes.text.small,
    config: {
      tension: 350,
      clamp: true
    }
  })

  const { modules, baseContainerID, connections } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  return (
    <Fragment>
      <animated.div 
        className={classes.Icon} 
        style={Object.assign(iconSpring, iconStyle)}
        onPointerDown={e => e.stopPropagation()}
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
        draggable={!isHighlighted}
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
            window.currUnHighlight()
            window.currUnHighlight = () => {}
          } else {
            window.currUnHighlight()
            setHighlighted(true)
            window.highlightedID = mod.id
            window.currUnHighlight = () => {
              window.highlightedID = ''
              setControlMenuOpen(false)
              setHighlighted(false)
            }
          }
        }}
      >
        {
        mod.connectionOutputs.length === 0 ? null
        :
        <div className={classes.IconConnector}
          draggable={true}
          onDragStart={(e) => {
            e.stopPropagation()
            e.dataTransfer.setData('fromID', mod.id)
          }}
        />
        }
        <animated.div className={classes.IconName} style={nameSpring} onClick={e => {
          if (isHighlighted) {
            e.stopPropagation()
            window.openRenameMenu(mod.id)
          }
        }}>
          {mod.name}
        </animated.div>
        {
        !controlMenuOpen ? null :
        <div className={classes.IconControlContainer} 
          onClick={e => e.stopPropagation()}
        >
          {mod.moduleType === CONTAINER ? <ContainerControlMenu selectedModule={mod as ContainerModule} reRenderIcon={reRenderIcon} /> : null}
          <ControlMenu audioModule={window.audioModules[mod.id]} selectedModule={mod} reRenderIcon={reRenderIcon} />
          <InputOutputView selectedModule={mod} modules={modules} />
          <MarkContainerIO baseContainerID={baseContainerID} selectedModule={mod} />
          <DeleteButton selectedModule={mod} />
        </div>
        }
      </animated.div>
      <animated.div className={classes.ArcherElement}
        style={Object.assign({}, iconSpring, archerElementStyle)}
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
            relations={mod.outputs.map(connectionID => {
              const { toID, param } = connections[connectionID]
              return {
                targetId: param === '' ? toID + ' input' : toID + ' controls',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                style: {
                  strokeColor: param === '' ? 'red' : 'blue',
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