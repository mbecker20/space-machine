import React, { Fragment } from 'react'
import { allModuleData } from './base/moduleData'
import ModuleIcon from './base/ModuleIcon'
import FileModuleIcon from './file/FileModuleIcon'
import SpaceDBModuleIcon from './spaceDB/SpaceDBModuleIcon'

interface Props {
  query: string
  spaceDBModules: string[]
  totNumModules: number
  totNumConnections: number
  onClose: () => void
  row: number
  col: number
}

function SearchIcons({ query, spaceDBModules, totNumModules, totNumConnections, onClose, row, col }: Props) {
  const upperCaseQuery = query.toUpperCase()
  const filteredSpaceDBModules = spaceDBModules.filter(moduleName => moduleName.toUpperCase().slice(0, upperCaseQuery.length) === upperCaseQuery)
  const filteredModuleData = allModuleData.filter(([fullName, ,]) => fullName.toUpperCase().slice(0, upperCaseQuery.length) === upperCaseQuery)
  const filteredFileModules = window.fileModuleSaveNames.filter(modName => modName.toUpperCase().slice(0, upperCaseQuery.length) === upperCaseQuery)
  return (
    <Fragment>
      {filteredSpaceDBModules.map((moduleName, index) => {
        return (
          <SpaceDBModuleIcon
            key={moduleName}
            moduleName={moduleName}
            totNumberModules={totNumModules}
            totNumberConnections={totNumConnections}
            onClose={onClose}
            row={row} col={col}
            isFocussed={index === 0}
          />
        )
      })}
      {filteredFileModules.map((saveName, index) => {
        return (
          <FileModuleIcon 
            key={saveName}
            name={saveName}
            totNumModules={totNumModules}
            totNumConnections={totNumConnections}
            onClose={onClose}
            row={row} col={col}
            isFocussed={filteredSpaceDBModules.length === 0 && index === 0}
          />
        )
      })}
      {filteredModuleData.map(([fullName, shortName, moduleType], index) => {
        return (
          <ModuleIcon
            isFocussed={filteredSpaceDBModules.length === 0 && filteredFileModules.length === 0 && index === 0}
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