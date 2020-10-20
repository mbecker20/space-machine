import React from 'react'
import ModuleIcons from './Icons/base/ModuleIcons'
import useJSS from './style'
import { EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES, SEARCH } from './AddModuleMenu'
import { effectModuleData, sourceModuleData, utilityModuleData } from './Icons/base/moduleData'
import SpaceDBModules from './Icons/SpaceDBModules'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import SearchIcons from './Icons/SearchIcons'

interface Props {
  selectedGroup: string
  row: number
  col: number
  query: string
  onClose: () => void
  spaceDBModules: string[]
}

function IconRouter({ selectedGroup, row, col, onClose, query, spaceDBModules }: Props) {
  const totNumModules = useSelector((state: RootState) => Object.keys(state.modules).length)
  const classes = useJSS()
  return (
    <div className={classes.IconRouter}>
      <ModuleIcons totNumModules={totNumModules}
        moduleData={
          selectedGroup === EFFECTS ? effectModuleData : 
          selectedGroup === SOURCES ? sourceModuleData :
          selectedGroup === UTILITY ? utilityModuleData :
          []
        }
        row={row} col={col}
        onClose={onClose}
      />
      {selectedGroup !== SPACEDB_MODULES ? null :
      <SpaceDBModules
        spaceDBModules={spaceDBModules}
        totNumModules={totNumModules}
        onClose={onClose}
        row={row} col={col}
      />}
      {selectedGroup !== SEARCH ? null :
      <SearchIcons
        query={query}
        spaceDBModules={spaceDBModules}
        totNumModules={totNumModules}
        onClose={onClose}
        row={row} col={col}
      />}
    </div>
  )
}

export default IconRouter