import React from 'react'
import useJSS from './style'
import getModuleColor from '../../theme/moduleColor'
import { ADD_MODULE } from '../../redux/modules/moduleActionTypes'
import genRandomID from '../../redux/idGen'


interface Props {
  fullName: string
  shortName: string
  moduleType: string
  totNumModules: number
}

function DrawerItem({ fullName, shortName, moduleType, totNumModules }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div 
        className={classes.DrawerIcon}
        style={{ backgroundColor: getModuleColor(moduleType) }}
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('type', ADD_MODULE)
          event.dataTransfer.setData('id', genRandomID(0, totNumModules))
          event.dataTransfer.setData('moduleType', moduleType)
          event.dataTransfer.setData('name', shortName)
        }}
      />
      <div className={classes.DrawerItemText}>
        {fullName}
      </div>
    </div>
  )
}

export default DrawerItem