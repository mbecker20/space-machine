import React, { Fragment } from 'react'
import useJSS from './style'
import { Module, Modules } from '../../redux/stateTSTypes'
import { useDispatch } from 'react-redux'
import { removeConnection } from '../../redux/allActions'
import { disconnect } from '../../audioModules/connection'
import { ConnectingAudioModule } from '../../audioModules/moduleTypes'

interface Props {
  selectedModule: Module
  modules: Modules
}

function InputOutputView({ selectedModule, modules }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  const am = window.audioModules
  return (
    <Fragment>

      {!selectedModule ? null : selectedModule.inputs.length === 0 ? null :
        <div className={classes.MenuHeader}>inputs</div>
      }

      {!selectedModule ? null : selectedModule.inputs.map((inputData, index) => {
        const { connectionID, connectedID, param, outputIndex, containerOutputChildID, containerInputChildID } = inputData
        const name = modules[connectedID].name
        return (
          <div className={classes.Connection}
            key={connectedID + param + 'inp' + index}
            onClick={() => {
              dispatch(removeConnection(connectedID, selectedModule.id, connectionID))
              disconnect(am[containerOutputChildID ? containerOutputChildID : connectedID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : selectedModule.id] as ConnectingAudioModule, param, outputIndex)
            }}
          >
            {`${name}${containerOutputChildID ? ` - ${modules[containerOutputChildID].name}` : ''}${param.length !== 0 ? ` - ${param}` : ''}`}
          </div>
        )
      })}

      {!selectedModule ? null : selectedModule.outputs.length === 0 ? null :
        <div className={classes.MenuHeader}>outputs</div>
      }

      {!selectedModule ? null : selectedModule.outputs.map((outputData, index) => {
        const { connectionID, connectedID, param, outputIndex, containerOutputChildID, containerInputChildID } = outputData
        const name = modules[connectedID].name
        return (
          <div className={classes.Connection}
            key={connectedID + param + 'out' + index}
            onClick={() => {
              dispatch(removeConnection(selectedModule.id, connectedID, connectionID))
              disconnect(am[containerOutputChildID ? containerOutputChildID : selectedModule.id] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : connectedID] as ConnectingAudioModule, param, outputIndex)
            }}
          >
            {`${name}${containerInputChildID ? ` - ${modules[containerInputChildID].name}` : ''}${param.length !== 0 ? ` - ${param}` : ''}`}
          </div>
        )
      })}
    </Fragment>
  )
}

export default InputOutputView