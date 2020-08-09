import React, { useState, useEffect } from 'react'
import ContainerDrawerItem from './containerDrawerItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { CONTAINER } from '../../audioModules/moduleTypes'

interface Props {
  totNumModules: number
}

function SpaceDBContainerMenu({ totNumModules }: Props) {
  const [containerSaves, setContainerSaves] = useState<string[]>([])
  useEffect(() => {
    window.containerSaveService.find().then((saveNames: string[]) => { setContainerSaves(saveNames) }) 
  })
  const state = useSelector((state: RootState) => state)
  return (
    <div style={{ width: '100%', height: '100%' }}
      onDrop={e => {
        const id = e.dataTransfer.getData('id')
        if (id && state.modules[id]) {
          const moduleType = state.modules[id].moduleType
          if (moduleType === CONTAINER) {
            window.openSpaceDBContainerSaveMenu(containerSaves, id, () => {
              window.setTimeout(() => {
                window.containerSaveService.find().then((saveNames: string[]) => { setContainerSaves(saveNames) })
              }, 1000)
            })
          }
        }
      }}
    >
      {containerSaves.map((containerName, index) => {
        return (
          <ContainerDrawerItem name={containerName} totNumModules={totNumModules} key={containerName + index}/>
        )
      })}
    </div>
  )
}

export default SpaceDBContainerMenu