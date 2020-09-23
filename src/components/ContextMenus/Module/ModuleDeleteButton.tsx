import React from 'react'
import { RootState } from '../../../redux/stateTSTypes'
import { disconnect } from '../../../audioModules/connection'
import { ConnectingAudioModule } from '../../../audioModules/moduleTypes'
import { useDispatch } from 'react-redux'
import { removeModule } from '../../../redux/allActions'
import { useSelector } from 'react-redux'
import DeleteButton from '../DeleteButton'

interface Props {
  modID: string
  onClose: () => void
}

function ModuleDeleteButton({ modID, onClose }: Props) {
  const am = window.audioModules
  const dispatch = useDispatch()
  const connections = useSelector((state: RootState) => state.connections)
  const selectedModule = useSelector((state: RootState) => state.modules[modID])
  return (
    <DeleteButton
      onClick={() => {
        selectedModule.inputs.forEach(inputData => {
          const { fromID, toID, param, outputIndex, actualOutputID: containerOutputChildID, actualInputID: containerInputChildID } = connections[inputData]
          disconnect(am[containerOutputChildID ? containerOutputChildID : fromID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : toID] as ConnectingAudioModule, param, outputIndex)
        })
        selectedModule.outputs.forEach(outputData => {
          const { fromID, toID, param, outputIndex, actualOutputID: containerOutputChildID, actualInputID: containerInputChildID } = connections[outputData]
          disconnect(am[containerOutputChildID ? containerOutputChildID : fromID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : toID] as ConnectingAudioModule, param, outputIndex)
        })
        dispatch(removeModule(selectedModule.id))
        onClose()
      }}
    />
  )
}

export default ModuleDeleteButton