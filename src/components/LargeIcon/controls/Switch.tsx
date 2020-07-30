import React from 'react'
import { Switch } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  actualModID: string
  modName?: string
}

function SwitchControl({ controlID, setFunc, actualModID, modName }: Props) {
  return (
    <Switch text={modName ? `${modName} - ${controlID}` : controlID} 
      initState={window.audioModules[actualModID].controlData[controlID].value as boolean} 
      onSwitch={(newState) => {
        setFunc(newState ? 'true' : 'false')
      }}
    />
  )
}

export default SwitchControl