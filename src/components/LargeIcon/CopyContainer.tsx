import React from 'react'
import { Button } from '../all'
import { duplicateContainer } from '../../redux/replicateContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'

interface Props {
  containerID: string
}

function CopyContainer({ containerID }: Props) {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  return (
    <Button
      onClick={() => {
        duplicateContainer(dispatch, state, window.fillContainerID, containerID)
      }}
    > copy container </Button>
  )
}

export default CopyContainer