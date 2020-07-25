import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import { DrawerModuleData } from './moduleData'

interface Props {
  moduleData: DrawerModuleData
}

function ModuleIcons({ moduleData }: Props) {
  return (
    <Fragment>
      {moduleData.map((modDat, index) => {
        return (
          <DrawerItem fullName={modDat[0]} id={modDat[1]} moduleType={ modDat[2]} key={index}/>
        )
      })}
    </Fragment>
  )
}

export default ModuleIcons