import React from 'react'
import useJSS from './style'

interface Props {
  fullName: string
  id: string
  moduleType: string
}

let numAdds = 0

function DrawerItem({ fullName, id, moduleType }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div 
        className={classes.DrawerIcon}
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('id', `${id} ${numAdds}`)
          event.dataTransfer.setData('moduleType', moduleType)
          event.dataTransfer.setData('name', id)
          window.setFillIsExpanded(true)
          numAdds+=1
        }}
        onDragEnd={() => {
          window.setFillIsExpanded(false)
        }}
      />
      <div className={classes.DrawerItemText}>
        {fullName}
      </div>
    </div>
  )
}

export default DrawerItem