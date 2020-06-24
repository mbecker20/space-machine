import React from 'react'
import { Module } from '../../redux/stateTSTypes'
import useJSS from './style'
import CSS from 'csstype'

// this is pretty much an icon with hints that the module has children.
// its onClick makes the module a fill module, and moves its zindex to the top.

interface Props {
  containerMod: Module
  col: number
  row: number
}

function ModuleViewMid({ containerMod, col, row }: Props) {
  const classes = useJSS()
  const midStyle: CSS.Properties = {
    gridColumn: `${col} / span 1`,
    gridRow: `${row} / span 1`,
  }
  return (
    <div className={classes.Mid} style={midStyle}>
      
    </div>
  )
}

export default ModuleViewMid