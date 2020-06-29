import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'

function BaseModules() {
  return (
    <Fragment>
      <DrawerItem name='container' id='cntnr'/>
      <DrawerItem name='oscillator' id='osc'/>
      <DrawerItem name='gate' id='gate'/>
      <DrawerItem name='output' id='out'/>
    </Fragment>
  )
}

export default BaseModules