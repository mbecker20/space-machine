import React, { useState } from 'react'
import CSS from 'csstype'
import useJSS from './style'
import { useDispatch, useSelector } from 'react-redux'
import { addModule } from '../../redux/allActions'
import { RootState, ContainerModule } from '../../redux/stateTSTypes'
import { moveModule } from '../../redux/modules/moduleActions'
import { isOccupied } from './helpers'
import { ModuleType } from '../../audioModules/moduleTypes'

interface Props {
  row: number
  col: number
}



function DropSquare({ row, col }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  const { modules } = useSelector((state: RootState) => {
    return {
      modules: state.modules
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
        const moduleType = event.dataTransfer.getData('moduleType') as ModuleType
        const fc = modules[window.fillContainerID] as ContainerModule
        const currentChildren = fc.childModules.concat(fc.childModules)
        const possiblyMod = modules[id]
        const possiblyOccupyingID = isOccupied(row, col, currentChildren, modules)
        if (!possiblyMod) {
          if (!possiblyOccupyingID) {
            setHL(false)
            dispatch(addModule(id, moduleType, window.fillContainerID, row, col))
            window.addModule(id, moduleType)
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
          dispatch(moveModule(id, row, col))
          dispatch(moveModule(possiblyOccupyingID, Number(fromRow), Number(fromCol)))
        } else {
          setHL(false)
          window.setFillIsExpanded(false)
          dispatch(moveModule(id, row, col))
        }
      }}
    />
  )
}

export default DropSquare