import React from 'react'
import { Switch } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  modID?: string
}

function SwitchControl({ controlID, setFunc, modID }: Props) {
  return (
    <Switch text={modID ? `${modID} - ${controlID}` : controlID} 
      initState={false} 
      onSwitch={(newState) => {
        setFunc(newState ? 'true' : 'false')
      }}
    />
  )
}

export default SwitchControl