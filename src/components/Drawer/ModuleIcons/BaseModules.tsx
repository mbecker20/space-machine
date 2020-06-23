import React, { Fragment } from 'react'
import { RouteComponentProps } from '@reach/router'
import DrawerItem from '../DrawerItem'

function BaseModules(props: RouteComponentProps) {
  return (
    <Fragment>
      <DrawerItem/>
    </Fragment>
  )
}

export default BaseModules