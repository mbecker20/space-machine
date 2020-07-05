import React, { useState } from 'react'
import useJSS from './style'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import ModuleViewIcon from './Icon'
import { ContainerModule } from '../../redux/stateTSTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { getGridRange } from './helpers'
import { range } from '../../helpers/genFuncs'
import DropSquare from './DropSquare'
import { ArcherContainer } from 'react-archer'

declare global {
  interface Window { setFillIsExpanded: (isExpanded: boolean) => void }
}

interface Props {
  containerModule: ContainerModule
}

const iconGridSize = sizes.moduleView.iconGrid
const gutterGridSize = sizes.moduleView.gutterGrid

function ModuleViewFill({ containerModule }: Props) {
  const classes = useJSS()
  const [isExpanded, setIsExpanded] = useState(false)
  window.setFillIsExpanded = setIsExpanded
  const { modules } = useSelector((state: RootState) => {
    return {
      modules: state.modules,
    }
  })
  const { maxRow, maxCol } = getGridRange(containerModule.childModules, modules)
  let gridStyle: CSS.Properties
  const isEmpty = containerModule.childModules.length === 0
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
        style={{ width: `${containerModule.name.length / 2}em` }}
        onClick={(e) => {
          e.stopPropagation()
          window.highlightedID = containerModule.id // need to add cases to on rename reducer to rename fill/base containers
          window.setLeftDrawerOpen(true)
        }}
      >{containerModule.name}</div>
      <ArcherContainer>
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
          {containerModule.childModules.map(moduleID => {
            const mod = modules[moduleID]
            return (
              <ModuleViewIcon
                key={mod.id}
                mod={mod}
                gridRow={mod.row * 2 + 1}
                gridCol={mod.col * 2 + 1}
              />
            )
          })}
        </div>
      </ArcherContainer>
    </div>
  )
}

export default ModuleViewFill