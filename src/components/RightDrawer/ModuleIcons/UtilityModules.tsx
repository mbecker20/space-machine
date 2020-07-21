import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import {
  CONTAINER,
  OUTPUT,
} from '../../../audioModules/moduleTypes'

function BaseModules() {
  return (
    <Fragment>
      <DrawerItem fullName='container' id='cntnr' moduleType={CONTAINER} />
      <DrawerItem fullName='output' id='out' moduleType={OUTPUT} />
    </Fragment>
  )
}

export default BaseModules