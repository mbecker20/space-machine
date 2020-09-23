import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { ModuleType } from '../../../../audioModules/moduleTypes'
import { RootState } from '../../../../redux/stateTSTypes'
import { DrawerModuleData } from './moduleData'
import ModuleIcon from './ModuleIcon'

interface Props {
  moduleData: DrawerModuleData
  row: number
  col: number
  onClose: () => void
}

function ModuleIcons({ moduleData, row, col, onClose }: Props) {
  const totNumModules = useSelector((state: RootState) => Object.keys(state.modules).length)
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