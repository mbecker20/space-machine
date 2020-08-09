import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import { DrawerModuleData } from './moduleData'

interface Props {
  moduleData: DrawerModuleData
  totNumModules: number
}

function ModuleIcons({ moduleData, totNumModules }: Props) {
  return (
    <Fragment>
      {moduleData.map((modDat, index) => {
        return (
          <DrawerItem fullName={modDat[0]} shortName={modDat[1]} moduleType={ modDat[2]} totNumModules={totNumModules} key={index}/>
        )
      })}
    </Fragment>
  )
}

export default ModuleIcons