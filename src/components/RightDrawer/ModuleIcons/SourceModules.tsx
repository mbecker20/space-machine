import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import {
  OSCILLATOR,
  CONSTANT,
  MEDIA_ELEMENT,
  LINE_IN,
} from '../../../audioModules/moduleTypes'

function SourceModules() {
  return (
    <Fragment>
      <DrawerItem fullName='file' id='local' moduleType={MEDIA_ELEMENT} />
      <DrawerItem fullName='stream' id='stream' moduleType={LINE_IN} />
      <DrawerItem fullName='oscillator' id='osc' moduleType={OSCILLATOR} />
      <DrawerItem fullName='constant' id='const' moduleType={CONSTANT} />
    </Fragment>
  )
}

export default SourceModules