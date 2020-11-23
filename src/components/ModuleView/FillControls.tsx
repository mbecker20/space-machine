import React from 'react'
import FlexCol from '../Flex/FlexCol'
import AllContainerControls from '../LargeIcon/AllContainerControls'
import { useSelector } from 'react-redux'
import { ContainerModule, RootState } from '../../redux/stateTSTypes'
import { useReRender } from '../hooks'
import useJSS from './style'

function FillControls() {
  const selectedMod = useSelector((state: RootState) => state.modules[window.fillContainerID] as ContainerModule)
  const reRender = useReRender()
  const classes = useJSS()
  return (
    <FlexCol className={classes.FillControls} alignItems='center'>
      <AllContainerControls selectedModule={selectedMod} reRender={reRender}/>
    </FlexCol>
  )
}

export default FillControls