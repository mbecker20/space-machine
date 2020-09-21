import React from 'react'
import { Button } from '../../all'
import { RootState } from '../../../redux/stateTSTypes'
import { disconnect } from '../../../audioModules/connection'
import { ConnectingAudioModule } from '../../../audioModules/moduleTypes'
import { useDispatch } from 'react-redux'
import { removeModule } from '../../../redux/allActions'
import { useSelector } from 'react-redux'
import trashSVG from '../../../icons/trash.svg'
import useJSS from './style'

interface Props {
  modID: string
  onClose: () => void
}

function DeleteButton({ modID, onClose }: Props) {
  const am = window.audioModules
  const dispatch = useDispatch()
  const connections = useSelector((state: RootState) => state.connections)
  const selectedModule = useSelector((state: RootState) => state.modules[modID])
  const classes = useJSS()
  return (
    <Button className={classes.DeleteButtonBounder}
      onPointerDown={e => { e.stopPropagation() }}
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
    >
      <img className={classes.DeleteButtonSVG}
        src={trashSVG}
        alt='delete'
      />
    </Button>
  )
}

export default DeleteButton