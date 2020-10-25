import React from 'react'
import { CONTAINER } from '../../../../../audioModules/moduleTypes'
import getModuleColor from '../../../../../theme/moduleColor'
import useJSS from '../style'

interface Props {
  name: string
  totNumModules: number
  row: number
  col: number
  onClose: () => void
  isFocussed: boolean
}

function FileModuleIcon({ name, totNumModules, row, col, onClose, isFocussed }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}
        style={{ backgroundColor: getModuleColor(CONTAINER) }}
      />
      <div className={classes.DrawerItemText}>
        {name}
      </div>
    </div>
  )
}

export default FileModuleIcon