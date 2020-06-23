import React from 'react'
import CSS from 'csstype'
import useJSS from './style'
import { Module } from '../../redux/stateTSTypes'

interface Props {
  mod: Module
  row: number
  col: number
}

function ModuleViewIcon({ mod, row, col }: Props) {
  const classes = useJSS()
  const iconStyle: CSS.Properties = {
    gridColumn: `${col} / span 1`,
    gridRow: `${row} / span 1`,
  }
  return (
    <div className={classes.Icon} style={iconStyle}>
      icon
    </div>
  )
}

export default ModuleViewIcon