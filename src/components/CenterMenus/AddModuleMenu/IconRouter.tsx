import React from 'react'
import ModuleIcons from './ModuleIcons/ModuleIcons'
import useJSS from './style'
import { EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES } from './AddModuleMenu'
import { effectModuleData, sourceModuleData, utilityModuleData } from './ModuleIcons/moduleData'

interface Props {
  selectedGroup: string
  row: number
  col: number
  onClose: () => void
}

function IconRouter({ selectedGroup, row, col, onClose }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.IconRouter}>
      <ModuleIcons 
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
    </div>
  )
}

export default IconRouter