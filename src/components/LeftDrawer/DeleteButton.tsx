import React from 'react'
import { Button } from '../all'
import { colors, sizes } from '../../theme/theme'
import { ContainerModule, Module } from '../../redux/stateTSTypes'
import { disconnect } from '../../audioModules/connection'
import { ConnectingAudioModule, AudioModule } from '../../audioModules/moduleTypes'
import { useDispatch } from 'react-redux'
import { removeConnection, removeModule } from '../../redux/allActions'

interface Props {
  selectedModule: Module | ContainerModule
  audioModule: AudioModule
}

function DeleteButton({ selectedModule, audioModule }: Props) {
  const am = window.audioModules
  const dispatch = useDispatch()
  return (
    <Button style={{
      backgroundColor: colors.deleteButton,
      width: '50%',
      fontSize: sizes.text.small
    }}
      onClick={() => {
        selectedModule.inputs.forEach(inputData => {
          const { connectionID, connectedID, param, outputIndex, containerOutputChildID, containerInputChildID } = inputData
          dispatch(removeConnection(connectedID, selectedModule.id, connectionID))
          disconnect(am[containerOutputChildID ? containerOutputChildID : connectedID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : selectedModule.id] as ConnectingAudioModule, param, outputIndex)
        })
        selectedModule.outputs.forEach(outputData => {
          const { connectionID, connectedID, param, outputIndex, containerOutputChildID, containerInputChildID } = outputData
          dispatch(removeConnection(selectedModule.id, connectedID, connectionID))
          disconnect(am[containerOutputChildID ? containerOutputChildID : selectedModule.id] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : connectedID] as ConnectingAudioModule, param, outputIndex)
        })
        dispatch(removeModule(window.highlightedID))
        window.setLeftDrawerOpen(false)
        window.highlightedID = ''
      }}
    >delete</Button>
  )
}

export default DeleteButton