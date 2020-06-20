import React from 'react'
import { Module } from '../../state/types'
import useJSS from './style'

interface Props {
  module: Module
}

function ModuleViewFill({ module }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.Fill}>
      
    </div>
  )
}

export default ModuleViewFill