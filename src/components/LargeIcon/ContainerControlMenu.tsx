import React from 'react'
import useJSS from './style'
import { ContainerModule } from '../../redux/stateTSTypes'
import AllContainerControls from './AllContainerControls'

interface Props {
  selectedModule: ContainerModule
  reRenderIcon: () => void
}

function ContainerControlMenu({ selectedModule, reRenderIcon }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ControlMenu}>
      <AllContainerControls selectedModule={selectedModule} reRender={reRenderIcon} />
    </div>
  )
}

export default ContainerControlMenu