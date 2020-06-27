import React, { useState } from 'react'
import useJSS from './style'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import ModuleViewMid from './Mid'
//import ModuleViewIcon from './Icon'
import { ContainerModule } from '../../redux/stateTSTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { getGridRange, range } from './helpers'
import DropSquare from './DropSquare'

declare global {
  interface Window { setFillIsExpanded: (isExpanded: boolean) => void }
}

interface Props {
  mod: ContainerModule
}

const iconGridSize = sizes.moduleView.iconGrid
const gutterGridSize = sizes.moduleView.gutterGrid

function ModuleViewFill({ mod }: Props) {
  const classes = useJSS()
  const [isExpanded, setIsExpanded] = useState(false)
  window.setFillIsExpanded = setIsExpanded
  const { containerMods } = useSelector((state: RootState) => {
    return {
      containerMods: state.containerModules,
    }
  })
  const { maxRow, maxCol } = getGridRange(mod.childContainers, containerMods)
  let gridStyle: CSS.Properties
  const isEmpty = mod.childContainers.length === 0
  if (isEmpty) {
    gridStyle = {
      gridTemplateRows: `repeat(${1}, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateColumns: `repeat(${1}, ${iconGridSize} ${gutterGridSize})`,
    }
  } else {
    gridStyle = {
      gridTemplateRows: `repeat(${isExpanded ? maxRow + 2 : maxRow + 1}, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateColumns: `repeat(${isExpanded ? maxCol + 2 : maxCol + 1}, ${iconGridSize} ${gutterGridSize})`,
    }
  }
  return (
    <div className={classes.FillBounder}>
      <div className={classes.FillHeader}
        style={{ width: `${mod.id.length}em` }}
        onClick={(e) => {
          e.stopPropagation()
          window.highlightedID = mod.id // need to add cases to on rename reducer to rename fill/base containers
          window.setLeftDrawerOpen(true)
          window.setLeftDrawerTopText(mod.id)
        }}
      >{mod.id}</div>
      <div className={classes.Fill} style={gridStyle} onClick={() => {
        window.highlightedID = ''
        window.currSetHighlighted(false)
        window.currSetHighlighted = (setHighlighted) => {}
        window.setLeftDrawerOpen(false)
      }}>
        {!isExpanded ? null : 
        isEmpty ? <DropSquare row={0} col={0}/> :
        range(0, isExpanded ? maxRow + 2 : maxRow + 1).map(row => {
          return range(0, isExpanded ? maxCol + 2 : maxCol + 1).map(col => {
            return (
              <DropSquare
                key={`${row} ${col}`}
                row={row} 
                col={col}
              />
            )
          })
        }).flat()}
        {mod.childContainers.map(containerID => {
          const containerMod = containerMods[containerID]
          return (
            <ModuleViewMid
              key={containerMod.id}
              containerMod={containerMod}
              gridRow={containerMod.row * 2 + 1}
              gridCol={containerMod.col * 2 + 1}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ModuleViewFill