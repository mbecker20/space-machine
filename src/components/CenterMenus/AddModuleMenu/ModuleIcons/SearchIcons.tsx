import React, { Fragment } from 'react'
import { allModuleData } from './moduleData'
import ModuleIcon from './ModuleIcon'
import SpaceDBModuleIcon from './SpaceDBModuleIcon'

interface Props {
  query: string
  spaceDBModules: string[]
  totNumModules: number
  onClose: () => void
  row: number
  col: number
}

function SearchIcons({ query, spaceDBModules, totNumModules, onClose, row, col }: Props) {
  const upperCaseQuery = query.toUpperCase()
  const filteredSpaceDBModules = spaceDBModules.filter(moduleName => moduleName.toUpperCase().slice(0, upperCaseQuery.length) === upperCaseQuery)
  const filteredModuleData = allModuleData.filter(([fullName, ,]) => fullName.toUpperCase().slice(0, upperCaseQuery.length) === upperCaseQuery)
  return (
    <Fragment>
      {filteredSpaceDBModules.map((moduleName, index) => {
        return (
          <SpaceDBModuleIcon
            key={index}
            moduleName={moduleName}
            totNumberModules={totNumModules}
            onClose={onClose}
            row={row} col={col}
            isFocussed={index === 0}
          />
        )
      })}
      {filteredModuleData.map(([fullName, shortName, moduleType], index) => {
        return (
          <ModuleIcon
            isFocussed={filteredSpaceDBModules.length === 0 && index === 0}
            key={index}
            fullName={fullName}
            shortName={shortName}
            moduleType={moduleType}
            totNumModules={totNumModules}
            row={row} col={col}
            onClose={onClose}
          />
        )
      })}
    </Fragment>
  )
}

export default SearchIcons