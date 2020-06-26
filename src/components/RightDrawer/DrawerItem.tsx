import React from 'react'
import useJSS from './style'

interface Props {
  name: string
  id: string
}

let numAdds = 0

function DrawerItem({ name, id }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div 
        className={classes.DrawerIcon} 
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('id', `${id} ${numAdds}`)
          window.setFillIsExpanded(true)
          numAdds+=1
        }}
        onDragEnd={() => {
          window.setFillIsExpanded(false)
        }}
      />
      <div className={classes.DrawerItemText}>
        {name}
      </div>
    </div>
  );
}

export default DrawerItem