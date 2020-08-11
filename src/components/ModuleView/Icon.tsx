import React, { useState, Fragment } from 'react'
import { Module, RootState, ContainerModule } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { animated, useSpring } from 'react-spring'
import { sizes } from '../../theme/theme'
import { ArcherElement } from 'react-archer'
import ControlMenu from '../LargeIcon/ControlMenu'
import InputOutputView from '../LargeIcon/InputOutputView'
import MarkContainerIO from '../LargeIcon/MarkContainerIO'
import DeleteButton from '../LargeIcon/DeleteButton'
import { CONTAINER } from '../../audioModules/moduleTypes'
import ContainerControlMenu from '../LargeIcon/ContainerControlMenu'
import getModuleColor from '../../theme/moduleColor'
import { bothStringsIn } from '../../helpers/genFuncs'
import { iconOnDrop, iconOnDragStart } from './callbacks'

interface Props {
  mod: Module
  gridCol: number
  gridRow: number
}

function ModuleViewIcon({ mod, gridCol, gridRow }: Props) {
  const classes = useJSS()
  const [isLarge, setLarge] = useState(false)
  const [reRender, toReRender] = useState(false)
  const reRenderIcon = () => { toReRender(!reRender) }

  const iconStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
    borderStyle: isLarge ? 'solid' : 'none',
    backgroundColor: getModuleColor(mod.moduleType),
    width: isLarge ? sizes.moduleView.bigIconWidth : sizes.moduleView.icon,
    height: isLarge ? sizes.moduleView.bigIconHeight : sizes.moduleView.icon
  }
  const archerElementStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
    width: isLarge ? sizes.moduleView.bigIconWidth : sizes.moduleView.icon,
    height: isLarge ? sizes.moduleView.bigIconHeight : sizes.moduleView.icon,
  }

  const nameSpring = useSpring({
    fontSize: isLarge ? sizes.text.medium : sizes.text.small,
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
        style={iconStyle}
        onPointerDown={e => e.stopPropagation()}
        onDragOver={event => {
          event.preventDefault()
        }}
        onDrop={e => {
          iconOnDrop(e, modules, mod, dispatch, setLarge)
        }}
        draggable={!isLarge}
        onDragStart={e => {
          iconOnDragStart(e, mod)
        }}
        onDragEnd={() => {
          window.setFillIsExpanded(false)
        }}
        onClick={e => {
          e.stopPropagation()
          setLarge(!isLarge)
          window.setTimeout(window.refreshArcherContainer, 0)
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
          if (isLarge) {
            e.stopPropagation()
            window.openRenameMenu(mod.id)
          }
        }}>
          {mod.name}
        </animated.div>
        {
        !isLarge ? null :
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
        style={archerElementStyle}
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
            relations={mod.outputs.filter(connectionID => {
              const { fromID, toID } = connections[connectionID]
              return bothStringsIn(fromID, toID, (modules[window.fillContainerID] as ContainerModule).childModules)
            }).map(connectionID => {
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