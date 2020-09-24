import React, { Fragment, useEffect, useState } from 'react'
import SpaceDBModuleIcon from './SpaceDBModuleIcon'

interface Props {
  totNumModules: number
  onClose: () => void
  row: number
  col: number
}

function SpaceDBModules({ totNumModules, onClose, row, col }: Props) {
  const [containerSaves, setContainerSaves] = useState<string[]>([])
  useEffect(() => {
    window.containerSaveService.find().then((saveNames: string[]) => { setContainerSaves(saveNames) })
  }, [])
  return (
    <Fragment>
      {containerSaves.map((containerName, index) => {
        return (
          <SpaceDBModuleIcon containerName={containerName}
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