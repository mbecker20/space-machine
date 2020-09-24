import React from 'react'
import ModuleIcons from './ModuleIcons/ModuleIcons'
import useJSS from './style'
import { EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES } from './AddModuleMenu'
import { effectModuleData, sourceModuleData, utilityModuleData } from './ModuleIcons/moduleData'
import SpaceDBModules from './ModuleIcons/SpaceDBModules'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'

interface Props {
  selectedGroup: string
  row: number
  col: number
  onClose: () => void
}

function IconRouter({ selectedGroup, row, col, onClose }: Props) {
  const totNumModules = useSelector((state: RootState) => Object.keys(state.modules).length)
  const classes = useJSS()
  return (
    <div className={classes.IconRouter}>
      <ModuleIcons totNumModules={totNumModules}
        moduleData={
          selectedGroup === EFFECTS ? effectModuleData : 
          selectedGroup === SOURCES ? sourceModuleData :
          selectedGroup === UTILITY ? utilityModuleData :
          selectedGroup === SPACEDB_MODULES ? [] :
          []
        }
        row={row} col={col}
        onClose={onClose}
      />
      {selectedGroup !== SPACEDB_MODULES ? null :
      <SpaceDBModules totNumModules={totNumModules}
        onClose={onClose}
        row={row} col={col}
      />
      }
    </div>
  )
}

export default IconRouter