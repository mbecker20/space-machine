import React, { useState } from 'react'
import { Module, RootState } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { moveModule, addConnection, removeConnection } from '../../redux/allActions'
import { ConnectingAudioModule } from '../../audioModules/moduleTypes'

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
  return (
    <div 
      className={classes.Icon} 
      style={iconStyle}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDrop={event => {
        const id = event.dataTransfer.getData('id')
        const possiblyMod = modules[id]
        if (possiblyMod) {
          const fromRow = event.dataTransfer.getData('fromRow')
          const fromCol = event.dataTransfer.getData('fromCol')
          window.setFillIsExpanded(false)
          dispatch(moveModule(id, mod.row, mod.col))
          dispatch(moveModule(mod.id, Number(fromRow), Number(fromCol)))
        }
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
      onClick={(e) => {
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
            window.setLeftDrawerTopText(mod.id)
            setHighlighted(true)
            window.highlightedID = mod.id
            window.currSetHighlighted(false)
            window.currSetHighlighted = setHighlighted
          }
        } else {
          const am = window.audioModules
          if (window.linkIsConnecting) {
            (am[window.linkToOutputID] as ConnectingAudioModule).connect(am[mod.id])
            dispatch(addConnection(window.linkToOutputID, mod.id))
          } else {
            (am[window.linkToOutputID] as ConnectingAudioModule).disconnect(am[mod.id])
            dispatch(removeConnection(window.linkToOutputID, mod.id))
          }
          window.linkToOutputID = ''
        }
      }}
    >
      {mod.id}
    </div>
  )
}

export default ModuleViewIcon