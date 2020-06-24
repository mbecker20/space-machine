import React, { useState } from 'react'
import CSS from 'csstype'
import useJSS from './style'
import { useDispatch, useSelector } from 'react-redux'
import { addContainer } from '../../redux/allActions'
import { RootState } from '../../redux/stateTSTypes'

interface Props {
  row: number
  col: number
}

function DropSquare({ row, col }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  const parentID = useSelector((state: RootState) => state.fillContainerID)
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
        const id = `${event.dataTransfer.getData('id')} ${parentID} ${row} ${col}`
        setHL(false)
        dispatch(addContainer(id, parentID, row, col))
      }}
    />
  )
}

export default DropSquare