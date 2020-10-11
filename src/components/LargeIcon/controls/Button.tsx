import React from 'react'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { sizes } from '../../../theme/theme'
import Button from '../../Button/Button'

interface Props {
  setFunc: SetFunc
  controlID: string
  modName?: string
  label?: string
}

function ButtonControl({ setFunc, controlID, modName, label }: Props) {
  return (
    <Button fontSize={sizes.text.small}
      onClick={() => {
        setFunc('')
      }}
    >
      {label ? label : modName ? `${modName} - ${controlID}` : controlID}
    </Button>
  )
}

export default ButtonControl