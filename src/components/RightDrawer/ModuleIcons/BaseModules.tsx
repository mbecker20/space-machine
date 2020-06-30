import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import { CONTAINER, OSCILLATOR, GATE, OUTPUT } from '../../../audioModules/moduleTypes'

function BaseModules() {
  return (
    <Fragment>
      <DrawerItem name='oscillator' id='osc' moduleType={OSCILLATOR}/>
      <DrawerItem name='output' id='out' moduleType={OUTPUT}/>
      <DrawerItem name='container' id='cntnr' moduleType={CONTAINER}/>
      <DrawerItem name='gate' id='gate' moduleType={GATE}/>
    </Fragment>
  )
}

export default BaseModules