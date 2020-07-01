import React from 'react'
import useJSS from './style'
import { Module } from '../../../redux/stateTSTypes'
import { OscillatorModule } from '../../../audioModules/oscillator'
import { disconnect } from '../../../audioModules/connection'
import { useDispatch } from 'react-redux'
import { removeConnection } from '../../../redux/allActions'

interface Props {
  mod: Module
}

function OscillatorMenu({ mod }: Props) {
  const classes = useJSS()
  const oscModule = window.audioModules[mod.id] as OscillatorModule
  const dispatch = useDispatch()
  return (
    <div className={classes.MenuBounder}>
      <div className={classes.MenuButton}
        onClick={() => {
          window.linkToOutputID = mod.id
          window.linkIsConnecting = true
        }}
      >connect to...</div>
      <div className={classes.SubMenuHeader}>outputs (click to disconnect)</div>
      {mod.outputs.map(id => {
        return (
          <div onClick={() => {
            disconnect(oscModule, window.audioModules[id])
            dispatch(removeConnection(mod.id, id))
          }}
          >{id}</div>
        )
      })}
    </div>
  )
}

export default OscillatorMenu