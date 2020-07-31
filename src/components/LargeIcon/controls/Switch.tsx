import React from 'react'
import { Switch } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  actualModID: string
  modName?: string
}

function SwitchControl({ controlID, setFunc, actualModID, modName }: Props) {
  const initState = useSelector((state: RootState) => state.modules[actualModID].controlData[controlID].value as boolean)
  return (
    <Switch text={modName ? `${modName} - ${controlID}` : controlID} 
      initState={initState} 
      onSwitch={(newState) => {
        setFunc(newState ? 'true' : 'false')
      }}
    />
  )
}

export default SwitchControl