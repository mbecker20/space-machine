import React from 'react'
import { Button } from '../../all'
import { SetFunc } from '../../../audioModules/moduleTypes'
import { colors } from '../../../theme/theme'

interface Props {
  setFunc: SetFunc
  controlID: string
  modID?: string
}

function ButtonControl({ setFunc, controlID, modID }: Props) {
  return (
    <Button style={{
      //backgroundColor: colors.fillModule,
      borderColor: colors.deleteButton,
      width: '50%',
    }}
      onClick={() => {
        setFunc('')
      }}
    >{modID ? `${modID} - ${controlID}` : controlID}</Button>
  )
}

export default ButtonControl