import React from 'react'
import { useDispatch } from 'react-redux'
import { ModuleType } from '../../../../audioModules/moduleTypes'
import genRandomID from '../../../../redux/idGen'
import getModuleColor from '../../../../theme/moduleColor'
import useJSS from '../style'

interface Props {
  fullName: string
  shortName: string
  moduleType: ModuleType
  totNumModules: number
  row: number
  col: number
  onClose: () => void
}

function ModuleIcon({ fullName, shortName, moduleType, totNumModules, row, col, onClose }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}
        style={{ backgroundColor: getModuleColor(moduleType) }}
        onClick={() => {
          window.addModule(
            genRandomID(0, totNumModules),
            shortName,
            window.fillContainerID,
            moduleType,
            dispatch,
            row, col
          )
          onClose()
        }}
      />
      <div className={classes.DrawerItemText}>
        {fullName}
      </div>
    </div>
  )
}

export default ModuleIcon