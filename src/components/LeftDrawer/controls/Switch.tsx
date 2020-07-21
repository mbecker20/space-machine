import React from 'react'
import { Switch } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
}

function SwitchControl({ controlID, setFunc }: Props) {
  return (
    <Switch text={controlID} 
      initState={false} 
      onSwitch={(newState) => {
        setFunc(newState ? 'true' : 'false')
      }}
    />
  )
}

export default SwitchControl