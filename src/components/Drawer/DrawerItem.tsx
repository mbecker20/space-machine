import React from 'react'
import useJSS from './style'
import { useDispatch } from 'react-redux'
import { setIsExpanded } from '../../redux/fillContainer/fcActions'

interface Props {
  id: string
}

function DrawerItem({ id }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  return (
    <div className={classes.DrawerItem}>
      <div 
        className={classes.DrawerIcon} 
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData('id', id)
          dispatch(setIsExpanded(true))
        }}
        onDragEnd={() => {
          dispatch(setIsExpanded(false))
        }}
      />
      <div className={classes.DrawerItemText}>
        {id}
      </div>
    </div>
  );
}

export default DrawerItem