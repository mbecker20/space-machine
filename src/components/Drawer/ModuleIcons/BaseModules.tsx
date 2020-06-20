import React, { Fragment } from 'react'
import { RouteComponentProps } from '@reach/router'
import DrawerItem from '../DrawerItem'
import { makeEmptyModule } from '../../../state/makeState'

function BaseModules(props: RouteComponentProps) {
  return (
    <Fragment>
      <DrawerItem mod={makeEmptyModule()}/>
    </Fragment>
  )
}

export default BaseModules