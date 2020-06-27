import React, { useState } from 'react'
import { Module, RootState } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { useSelector, useDispatch } from 'react-redux'
import { moveContainer } from '../../redux/allActions'

declare global {
  interface Window { 
    highlightedID: string,
    currSetHighlighted: (setHighlighted: boolean) => void
  }
}

window.currSetHighlighted = (setHighlighted) => {}

interface Props {
  containerMod: Module
  gridCol: number
  gridRow: number
}

function ModuleViewMid({ containerMod, gridCol, gridRow }: Props) {
  const classes = useJSS()
  const [isHighlighted, setHighlighted] = useState(containerMod.id === window.highlightedID)
  if (containerMod.id === window.highlightedID) {
    window.currSetHighlighted = setHighlighted
  }
  const midStyle: CSS.Properties = {
    gridColumn: `${gridCol} / span 1`,
    gridRow: `${gridRow} / span 1`,
    borderStyle: isHighlighted ? 'solid' : 'none'
  }
  const containerModules = useSelector((state: RootState) => state.containerModules)
  const dispatch = useDispatch()
  return (
    <div 
      className={classes.Mid} 
      style={midStyle}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDrop={event => {
        const id = event.dataTransfer.getData('id')
        const possiblyMod = containerModules[id]
        if (possiblyMod) {
          const fromRow = event.dataTransfer.getData('fromRow')
          const fromCol = event.dataTransfer.getData('fromCol')
          window.setFillIsExpanded(false)
          dispatch(moveContainer(id, containerMod.row, containerMod.col))
          dispatch(moveContainer(containerMod.id, Number(fromRow), Number(fromCol)))
        }
      }}
      draggable={true}
      onDragStart={event => {
        event.dataTransfer.setData('id', containerMod.id)
        event.dataTransfer.setData('fromRow', `${containerMod.row}`)
        event.dataTransfer.setData('fromCol', `${containerMod.col}`)
        window.setFillIsExpanded(true)
      }}
      onDragEnd={() => {
        window.setFillIsExpanded(false)
      }}
      onClick={(e) => {
        if (e.stopPropagation) {
          e.stopPropagation()
        }
        if (containerMod.id === window.highlightedID) {
          window.setLeftDrawerOpen(false)
          setHighlighted(false)
          window.highlightedID = ''
          window.currSetHighlighted = (setHighlighted) => {}
        } else {
          window.setLeftDrawerOpen(true)
          window.setLeftDrawerTopText(containerMod.id)
          setHighlighted(true)
          window.highlightedID = containerMod.id
          window.currSetHighlighted(false)
          window.currSetHighlighted = setHighlighted
        }
      }}
    >{containerMod.id}</div>
  )
}

export default ModuleViewMid