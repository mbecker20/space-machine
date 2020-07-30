import React from 'react'
import { Switch } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  modName?: string
}

function SwitchControl({ controlID, setFunc, modName }: Props) {
  return (
    <Switch text={modName ? `${modName} - ${controlID}` : controlID} 
      initState={false} 
      onSwitch={(newState) => {
        setFunc(newState ? 'true' : 'false')
      }}
    />
  )
}

export default SwitchControl