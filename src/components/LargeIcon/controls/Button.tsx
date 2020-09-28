import React from 'react'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { colors } from '../../../theme/theme'
import Button from '../../Button/Button'

interface Props {
  setFunc: SetFunc
  controlID: string
  modName?: string
  label?: string
}

function ButtonControl({ setFunc, controlID, modName, label }: Props) {
  return (
    <Button style={{
      //backgroundColor: colors.fillModule,
      borderColor: colors.deleteButton,
      width: '50%',
      padding: '.3em',
    }}
      onClick={() => {
        setFunc('')
      }}
    >
      {label ? label : modName ? `${modName} - ${controlID}` : controlID}
    </Button>
  )
}

export default ButtonControl