import React from 'react'
import { Module } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import { getMaxRow } from './helpers'
import ModuleViewMid from './Mid'
import ModuleViewIcon from './Icon'


interface Props {
  mod?: Module
}

const iconGridSize = sizes.moduleView.iconGrid
const gutterGridSize = sizes.moduleView.gutterGrid

function ModuleViewFill({ mod }: Props) {
  const classes = useJSS()
  let gridStyle: CSS.Properties
  if(mod) {
    gridStyle = {
      gridTemplateColumns: `repeat(${mod.children.columns.length}, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateRows: `repeat(${getMaxRow(mod)}, ${iconGridSize} ${gutterGridSize})`,
    }
  } else {
    gridStyle = {
      gridTemplateColumns: `repeat(0, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateRows: `repeat(0, ${iconGridSize} ${gutterGridSize})`,
    }
  }
  return (
    <div className={classes.Fill} style={gridStyle}>
      {mod.children.columns.map((col, colIndex) => {
        return (
          col.map((childMod, rowIndex) => {
            if (childMod.children.columns.length > 0) {
              return (
                <ModuleViewMid mod={childMod} col={2 * colIndex} row={2 * rowIndex}/>
              )
            } else {
              return (
                <ModuleViewIcon mod={childMod} col={2 * colIndex} row={2 * rowIndex}/>
              )
            }
          })
        )
      }).flat()}
    </div>
  )
}

export default ModuleViewFill