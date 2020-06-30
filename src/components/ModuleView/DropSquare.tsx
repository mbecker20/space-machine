import React, { useState } from 'react'
import CSS from 'csstype'
import useJSS from './style'
import { useDispatch, useSelector } from 'react-redux'
import { addContainer } from '../../redux/allActions'
import { RootState } from '../../redux/stateTSTypes'
import { moveContainer } from '../../redux/modules/moduleActions'
import { isOccupied } from './helpers'

interface Props {
  row: number
  col: number
}



function DropSquare({ row, col }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  const { containerModules } = useSelector((state: RootState) => {
    return {
      containerModules: state.containerModules
    }
  })
  const [isHL, setHL] = useState(false) // to highlight on drag enter
  const dsStyle: CSS.Properties = {
    gridColumn: `${col * 2 + 1} / span 1`,
    gridRow: `${row * 2 + 1} / span 1`,
    borderStyle: isHL ? 'solid' : 'none',
  }
  return (
    <div 
      className={classes.DropSquare} 
      style={dsStyle}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDragEnter={() => {
        setHL(true)
      }}
      onDragLeave={() => {
        setHL(false)
      }}
      onDrop={event => {
        const id = event.dataTransfer.getData('id')
        const fc = containerModules[window.fillContainerID]
        const currentChildren = fc.childContainers.concat(fc.childModules)
        const possiblyMod = containerModules[id]
        const possiblyOccupyingID = isOccupied(row, col, currentChildren, containerModules)
        if (!possiblyMod) {
          if (!possiblyOccupyingID) {
            setHL(false)
            dispatch(addContainer(id, window.fillContainerID, row, col))
            window.setFillIsExpanded(false)
            window.currSetHighlighted(false)
            window.highlightedID = id
            window.setLeftDrawerOpen(true)
            window.setLeftDrawerTopText(id)
          }
        } else if (possiblyOccupyingID) {
          const fromRow = event.dataTransfer.getData('fromRow')
          const fromCol = event.dataTransfer.getData('fromCol')
          setHL(false)
          window.setFillIsExpanded(false)
          dispatch(moveContainer(id, row, col))
          dispatch(moveContainer(possiblyOccupyingID, Number(fromRow), Number(fromCol)))
        } else {
          setHL(false)
          window.setFillIsExpanded(false)
          dispatch(moveContainer(id, row, col))
        }
      }}
    />
  )
}

export default DropSquare