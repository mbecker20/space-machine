import React, { useState } from 'react'
import CSS from 'csstype'
import useJSS from './style'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, ContainerModule } from '../../redux/stateTSTypes'
import { moveModule } from '../../redux/modules/moduleActions'
import { isOccupied } from '../ModuleView/helpers'
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
    gridColumn: `${col + 1} / span 1`,
    gridRow: `${row + 1} / span 1`,
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
        const fc = modules[window.fillContainerID] as ContainerModule
        const currentChildren = fc.childModules.concat(fc.childModules)
        const possiblyMod = modules[id]
        const possiblyOccupyingID = isOccupied(row, col, currentChildren, modules)
        if (!possiblyMod) {
          if (!possiblyOccupyingID) {
            const moduleType = event.dataTransfer.getData('moduleType') as ModuleType
            const name = event.dataTransfer.getData('name')
            setHL(false)
            window.addModule(id, name, window.fillContainerID, moduleType, dispatch, row, col)
            window.setFillIsExpanded(false)
          }
        } else if (possiblyOccupyingID) {
          const fromRow = event.dataTransfer.getData('fromRow')
          const fromCol = event.dataTransfer.getData('fromCol')
          setHL(false)
          window.setFillIsExpanded(false)
          dispatch(moveModule(id, row, col))
          dispatch(moveModule(possiblyOccupyingID, Number(fromRow), Number(fromCol)))
          window.setTimeout(window.refreshArcherContainer, 1)
        } else {
          setHL(false)
          window.setFillIsExpanded(false)
          dispatch(moveModule(id, row, col))
          window.setTimeout(window.refreshArcherContainer, 1)
        }
      }}
    />
  )
}

export default DropSquare