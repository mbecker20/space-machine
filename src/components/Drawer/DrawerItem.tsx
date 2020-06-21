import React from 'react'
import useJSS from './style'
import { Module } from '../../state/stateTSTypes';

interface Props {
  mod: Module
}

function DrawerItem({ mod }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}/>
      <div className={classes.DrawerItemText}>
        {mod.id}
      </div>
    </div>
  );
}

export default DrawerItem