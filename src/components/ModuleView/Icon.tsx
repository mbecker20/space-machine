import React, { useState } from 'react'
import { Module, RootState } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { moveModule } from '../../redux/allActions'
import ConnectionMenu from './ConnectionMenu'
import { OUTPUT } from '../../audioModules/moduleTypes'

declare global {
  interface Window {
    currSetHighlighted: (setHighlighted: boolean) => void
  }
}

window.currSetHighlighted = (setHighlighted) => {}

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
    borderStyle: isHighlighted ? 'solid' : 'none'
  }
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  const [cmState, setCMState] = useState({ // connectionMenuState
    isOpen: false,
    fromID: '',
  })
  return (
    <div 
      className={classes.Icon} 
      style={iconStyle}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDragEnter={() => {
        setHighlighted(true)
      }}
      onDragLeave={() => {
        setHighlighted(false)
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
          }
        } else {
          const fromID = e.dataTransfer.getData('fromID')
          if (fromID) {
            setCMState({
              isOpen: true,
              fromID
            })
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
        if (window.linkToOutputID.length === 0) {
          if (mod.id === window.highlightedID) {
            window.setLeftDrawerOpen(false)
            setHighlighted(false)
            window.highlightedID = ''
            window.currSetHighlighted = (setHighlighted) => {}
          } else {
            window.setLeftDrawerOpen(true)
            window.reRenderLeftDrawer()
            setHighlighted(true)
            window.highlightedID = mod.id
            window.currSetHighlighted(false)
            window.currSetHighlighted = setHighlighted
          }
        } else {
          setCMState({
            isOpen: true,
            fromID: window.linkToOutputID
          })
        }
      }}
    >
      {mod.moduleType !== OUTPUT ? 
      <div className={classes.IconConnector}
        draggable={true}
        onDragStart={(e) => {
          e.stopPropagation()
          e.dataTransfer.setData('fromID', mod.id)
        }}
      /> : <div style={{ width: '1vmin', height: '1vmin' }}/>}
      <div className={classes.IconName}>
        {mod.name}
      </div>
      {!cmState.isOpen ? null : 
      <ConnectionMenu fromID={cmState.fromID} toID={mod.id} 
        onClose={() => {
          setCMState({
            isOpen: false,
            fromID: '',
          })
          window.linkToOutputID = ''
        }}
      />}
    </div>
  )
}

export default ModuleViewIcon