import React from 'react'
import useJSS from './style'
import { Module } from '../../../redux/stateTSTypes'

interface Props {
  mod: Module
}

function OscillatorMenu({ mod }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.MenuBounder}>
      <div className={classes.SubMenu}>
        <div>connect to...</div>
        <div className={classes.SubMenuHeader}>outputs</div>
        {mod.outputs.map(id => <div>id</div>)}
      </div>
    </div>
  )
}

export default OscillatorMenu