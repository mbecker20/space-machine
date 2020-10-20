import React, { Fragment, useEffect } from 'react'
import SpaceDBModuleIcon from './SpaceDBModuleIcon'

interface Props {
  totNumModules: number
  onClose: () => void
  row: number
  col: number
  spaceDBModules: string[]
}

function SpaceDBModules({ spaceDBModules, totNumModules, onClose, row, col }: Props) {
  useEffect(() => {
    window.refreshSpaceDBModules()
  }, [])
  return (
    <Fragment>
      {spaceDBModules.map((moduleName, index) => {
        return (
          <SpaceDBModuleIcon 
            moduleName={moduleName}
            key={index}
            totNumberModules={totNumModules}
            onClose={onClose}
            row={row} col={col}
          />
        )
      })}
    </Fragment>
  )
}

export default SpaceDBModules