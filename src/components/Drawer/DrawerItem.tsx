import React from 'react'
import useJSS from './style'

interface Props {
  id: string
}

function DrawerItem({ id }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div 
        className={classes.DrawerIcon} 
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('id', id)
        }}
      />
      <div className={classes.DrawerItemText}>
        {id}
      </div>
    </div>
  );
}

export default DrawerItem