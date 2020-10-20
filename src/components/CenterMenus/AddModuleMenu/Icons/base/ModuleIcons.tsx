import React, { Fragment } from 'react'
import { ModuleType } from '../../../../../audioModules/moduleTypes'
import { DrawerModuleData } from './moduleData'
import ModuleIcon from './ModuleIcon'

interface Props {
  totNumModules: number
  moduleData: DrawerModuleData
  row: number
  col: number
  onClose: () => void
}

function ModuleIcons({ totNumModules, moduleData, row, col, onClose }: Props) {
  return (
    <Fragment>
      {moduleData.map(([fullName, shortName, moduleType], index) => {
        return (
          <ModuleIcon key={index} 
            fullName={fullName} 
            shortName={shortName} 
            moduleType={moduleType as ModuleType} 
            totNumModules={totNumModules} 
            row={row} col={col}
            onClose={onClose}
          />
        )
      })}
    </Fragment>
  )
}

export default ModuleIcons