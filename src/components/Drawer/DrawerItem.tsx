import React from 'react'
import useJSS from './style'

interface Props {
  children?: React.ReactNode
}

function DrawerItem({ children }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.DrawerItem}>
      {children}
    </div>
  );
}

export default DrawerItem