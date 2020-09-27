import React from 'react'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import Switch from '../../Switch/Switch'

interface Props {
  controlID: string
  setFunc: SetFunc
  actualModID: string
  modName?: string
  label?: string
}

function SwitchControl({ controlID, setFunc, actualModID, modName, label }: Props) {
  const initState = useSelector((state: RootState) => state.modules[actualModID].controlData[controlID].value as boolean)
  return (
    <Switch text={label ? label : modName ? `${modName} - ${controlID}` : controlID} 
      initState={initState} 
      onSwitch={(newState) => {
        setFunc(newState ? 'true' : 'false')
      }}
    />
  )
}

export default SwitchControl