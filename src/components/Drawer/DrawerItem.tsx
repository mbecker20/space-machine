import React from 'react'
import useJSS from './style'
import { Module } from '../../redux/stateTSTypes';

interface Props {
  mod?: Module
}

function DrawerItem({ mod }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}/>
      <div className={classes.DrawerItemText}>
        'item'
      </div>
    </div>
  );
}

export default DrawerItem