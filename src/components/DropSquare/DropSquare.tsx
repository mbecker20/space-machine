import React, { useState } from 'react'
import CSS from 'csstype'
import useJSS from './style'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { onDrop } from './callbacks'

interface Props {
  row: number
  col: number
}

// drag types
export const MOVE = 'MOVE'
export const COPY = 'COPY'

function DropSquare({ row, col }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const [, setHL] = useState(false) // to highlight on drag enter
  const dsStyle: CSS.Properties = {
    gridColumn: `${col + 1} / span 1`,
    gridRow: `${row + 1} / span 1`,
  }
  return (
    <div 
      className={classes.DropSquare} 
      style={dsStyle}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDragEnter={e => {
        if (e.dataTransfer.types.length >= 3) {
          setHL(true)
        }
      }}
      onDragLeave={e => {
        if (e.dataTransfer.types.length >= 3) {
          setHL(false)
        }
      }}
      onDrop={e => {
        onDrop(e, dispatch, state, row, col, setHL)
      }}
      onContextMenu={e => {
        e.preventDefault()
        window.openAddModuleMenu(row, col)
      }}
    />
  )
}

export default DropSquare