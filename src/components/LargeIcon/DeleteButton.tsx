import React from 'react'
import { Button } from '../all'
import { colors, sizes } from '../../theme/theme'
import { ContainerModule, Module, RootState } from '../../redux/stateTSTypes'
import { disconnect } from '../../audioModules/connection'
import { ConnectingAudioModule } from '../../audioModules/moduleTypes'
import { useDispatch } from 'react-redux'
import { removeModule } from '../../redux/allActions'
import { useSelector } from 'react-redux'

interface Props {
  selectedModule: Module | ContainerModule
}

function DeleteButton({ selectedModule }: Props) {
  const am = window.audioModules
  const dispatch = useDispatch()
  const connections = useSelector((state: RootState) => state.connections)
  return (
    <Button style={{
      backgroundColor: colors.deleteButton,
      width: '50%',
      fontSize: sizes.text.small
    }}
      onClick={() => {
        selectedModule.inputs.forEach(inputData => {
          const { fromID, toID, param, outputIndex, actualOutputID: containerOutputChildID, actualInputID: containerInputChildID } = connections[inputData]
          disconnect(am[containerOutputChildID ? containerOutputChildID : fromID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : toID] as ConnectingAudioModule, param, outputIndex)
        })
        selectedModule.outputs.forEach(outputData => {
          const { fromID, toID, param, outputIndex, actualOutputID: containerOutputChildID, actualInputID: containerInputChildID } = connections[outputData]
          disconnect(am[containerOutputChildID ? containerOutputChildID : fromID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : toID] as ConnectingAudioModule, param, outputIndex)
        })
        dispatch(removeModule(selectedModule.id)) // should remove all connections
      }}
    >delete</Button>
  )
}

export default DeleteButton