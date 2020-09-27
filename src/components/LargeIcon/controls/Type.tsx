import React from 'react'
import useJSS from './style'
import { SetFunc, AudioModuleWithTypes, ConnectingAudioModule } from '../../../audioModules/moduleTypes'
import { useDispatch, useSelector } from 'react-redux'
import { updateControlValue } from '../../../redux/allActions'
import { RootState } from '../../../redux/stateTSTypes'
import FlexRow from '../../Flex/FlexRow'

interface Props {
  setFunc: SetFunc
  actualModID: string
  modName?: string
  controlID: string
  label?: string
}

function Type({ setFunc, controlID, actualModID, modName, label }: Props) {
  const classes = useJSS()
  const audioModule = window.audioModules[actualModID] as ConnectingAudioModule
  const { audioNode } = audioModule
  const dispatch = useDispatch()
  const value = useSelector((state: RootState) => state.modules[actualModID].controlData[controlID].value)
  return (
    <FlexRow style={{ justifyContent: 'center', margin: '1vmin 0vmin' }}>
      <label htmlFor={'type'}>{label ? label : modName ? `set type - ${modName}` : 'set type'}</label>
      <select className={classes.ControlTypeSelect}
        name='type' id='type'
        onChange={e => {
          setFunc(e.target.value)
          dispatch(updateControlValue(actualModID, controlID, e.target.value))
        }}
        value={value as string ? value as string : audioNode.type as string}
      >
        {(audioModule as AudioModuleWithTypes).typeTypes.map(type => {
          return (
            <option value={type} key={actualModID + type}>{type}</option>
          )
        })}
      </select>
    </FlexRow>
  )
}

export default Type