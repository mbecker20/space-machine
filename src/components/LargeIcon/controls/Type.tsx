import React, { Fragment } from 'react'
import useJSS from './style'
import { SetFunc, Value, AudioModuleWithTypes } from '../../../audioModules/moduleTypes'
import { useDispatch } from 'react-redux'
import { updateControlValue } from '../../../redux/allActions'

interface Props {
  setFunc: SetFunc
  audioModule: AudioModuleWithTypes
  value: Value | undefined
  modID: string
  modName?: string
  controlID: string
}

function Type({ setFunc, audioModule, controlID, value, modID, modName }: Props) {
  const classes = useJSS()
  const { audioNode } = audioModule
  const dispatch = useDispatch()
  return (
    <Fragment>
      <label htmlFor={'type'}>{modName ? `set type - ${modName}` : 'set type'}</label>
      <select className={classes.ControlTypeSelect}
        name='type' id='type'
        onChange={(e) => {
          setFunc(e.target.value)
          dispatch(updateControlValue(modID, controlID, e.target.value))
        }}
        value={value as string ? value as string : audioNode.type as string}
      >
        {(audioModule as AudioModuleWithTypes).typeTypes.map(type => {
          return (
            <option value={type} key={modID + type}>{type}</option>
          )
        })}
      </select>
    </Fragment>
  )
}

export default Type