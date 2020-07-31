import React from 'react'
import { Button } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { colors } from '../../../theme/theme'

interface Props {
  setFunc: SetFunc
  controlID: string
  modName?: string
}

function ButtonControl({ setFunc, controlID, modName }: Props) {
  return (
    <Button style={{
      //backgroundColor: colors.fillModule,
      borderColor: colors.deleteButton,
      width: '50%',
    }}
      onClick={() => {
        setFunc('')
      }}
    >{modName ? `${modName} - ${controlID}` : controlID}</Button>
  )
}

export default ButtonControl