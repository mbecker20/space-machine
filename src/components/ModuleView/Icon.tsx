import React, { useState, Fragment } from 'react'
import { Module, RootState } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { moveModule } from '../../redux/allActions'
import { ConnectionMenu } from '../all'
import { animated } from 'react-spring'
import { sizes } from '../../theme/theme'
import { ArcherElement } from 'react-archer' 

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
  if (mod.id === window.highlightedID) {
    window.currSetHighlighted = setHighlighted
  }
  const iconStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
    borderStyle: isHighlighted ? 'solid' : 'none',
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
  }
  const archerElementStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
  }
  /*
  const iconSpring0 = useSpring({
    width: isHighlighted ? sizes.moduleView.bigIcon : sizes.moduleView.icon,
    height: isHighlighted ? sizes.moduleView.bigIcon : sizes.moduleView.icon,
    config: {
      tension: 550,
    }
  })
  const iconSpring1 = useSpring({
    zIndex: isHighlighted ? 3 : 2,
    config: { duration: 0 }
  })
  */
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  const [cmState, setCMState] = useState({ // connectionMenuState
    isOpen: false,
    fromID: '',
  })
  return (
    <Fragment>
      <animated.div 
        className={classes.Icon} 
        style={iconStyle}
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
              window.setTimeout(window.refreshArcherContainer, 500)
            }
          } else {
            if (mod.connectionInputs.length === 0 && window.audioModules[mod.id].connectingParamIDs.length === 0) {
              alert('mod cannot accept input')
            } else {
              const fromID = e.dataTransfer.getData('fromID')
              if (fromID) {
                setCMState({
                  isOpen: true,
                  fromID,
                })
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
            window.setLeftDrawerOpen(false)
            setHighlighted(false)
            window.highlightedID = ''
            window.currSetHighlighted = (setHighlighted) => {}
          } else {
            setHighlighted(true)
            window.highlightedID = mod.id
            window.setLeftDrawerOpen(true)
            window.reRenderLeftDrawer()
            window.currSetHighlighted(false)
            window.currSetHighlighted = setHighlighted
          }
          window.setTimeout(() => { window.refreshArcherContainer() }, 10)
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
        <div className={classes.IconName}>
          {mod.name}
        </div>
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
      {!cmState.isOpen ? null
      :
      <ConnectionMenu fromID={cmState.fromID} toID={mod.id}
        onClose={() => {
          setCMState({
            isOpen: false,
            fromID: '',
          })
          window.linkToOutputID = ''
        }}
      />}
    </Fragment>
  )
}

export default ModuleViewIcon