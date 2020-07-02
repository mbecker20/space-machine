import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import { CONTAINER, OSCILLATOR, AUTOFILTER, GAIN, OUTPUT } from '../../../audioModules/moduleTypes'

function BaseModules() {
  return (
    <Fragment>
      <DrawerItem fullName='oscillator' id='osc' moduleType={OSCILLATOR}/>
      <DrawerItem fullName='gain' id='gain' moduleType={GAIN}/>
      <DrawerItem fullName='output' id='out' moduleType={OUTPUT}/>
      <DrawerItem fullName='container'  id='cntnr' moduleType={CONTAINER}/>
      <DrawerItem fullName='auto filter' id='filter' moduleType={AUTOFILTER}/>
    </Fragment>
  )
}

export default BaseModules