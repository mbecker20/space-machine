import React, { Fragment } from 'react'
import useJSS from './style'
import { SetFunc, Value, AudioModuleWithTypes } from '../../../audioModules/moduleTypes'
import { Module, ContainerModule } from '../../../redux/stateTSTypes'

interface Props {
  setFunc: SetFunc
  audioModule: AudioModuleWithTypes
  value: Value | undefined
  selectedModule: Module | ContainerModule
  reRenderIcon: () => void
  modID?: string
}

function Type({ setFunc, audioModule, value, selectedModule, reRenderIcon, modID }: Props) {
  const classes = useJSS()
  const { audioNode } = audioModule
  return (
    <Fragment>
      <label htmlFor={'type'}>{modID ? `set type - ${modID}` : 'set type'}</label>
      <select className={classes.ControlTypeSelect}
        name='type' id='type'
        onChange={(e) => {
          setFunc(e.target.value)
          reRenderIcon()
        }}
        value={value as string ? value as string : audioNode.type as string}
      >
        {(audioModule as AudioModuleWithTypes).typeTypes.map(type => {
          return (
            <option value={type} key={selectedModule.id + type}>{type}</option>
          )
        })}
      </select>
    </Fragment>
  )
}

export default Type