import React from 'react'
import useJSS from './style'
import getModuleColor from '../../theme/moduleColor'
import { CONTAINER } from '../../audioModules/moduleTypes'
import genRandomID from '../../redux/idGen'

// drop types

export const CONTAINER_RESTORE = 'CONTAINER_RESTORE'

interface Props {
  name: string
  totNumModules: number
}

function ContainerDrawerItem({ name, totNumModules }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div
        className={classes.DrawerIcon}
        style={{ backgroundColor: getModuleColor(CONTAINER) }}
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('type', CONTAINER_RESTORE)
          event.dataTransfer.setData('name', name)
          event.dataTransfer.setData('id', genRandomID(0, totNumModules))
        }}
      />
      <div className={classes.DrawerItemText}>
        {name}
      </div>
    </div>
  )
}

export default ContainerDrawerItem