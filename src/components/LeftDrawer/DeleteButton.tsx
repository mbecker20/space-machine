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
      borderColor: colors.deleteButton,
      //backgroundColor: colors.fillModule,
      width: '50%',
      fontSize: sizes.text.small
    }}
      onClick={() => {
        selectedModule.inputs.forEach(inputData => {
          disconnect(am[inputData[0]] as ConnectingAudioModule, audioModule as ConnectingAudioModule, inputData[1])
          dispatch(removeConnection(inputData[0], selectedModule.id, inputData[1]))
        })
        selectedModule.outputs.forEach(outputData => {
          disconnect(audioModule as ConnectingAudioModule, am[outputData[0]] as ConnectingAudioModule, outputData[1])
          dispatch(removeConnection(selectedModule.id, outputData[0], outputData[1]))
        })
        dispatch(removeModule(window.highlightedID))
        window.setLeftDrawerOpen(false)
        window.highlightedID = ''
      }}
    >delete</Button>
  )
}

export default DeleteButton