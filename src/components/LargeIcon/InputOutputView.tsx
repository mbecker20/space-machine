import React, { Fragment } from 'react'
import useJSS from './style'
import { Module, Modules, RootState } from '../../redux/stateTSTypes'
import { useDispatch, useSelector } from 'react-redux'
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
  const connections = useSelector((state: RootState) => state.connections)
  return (
    <Fragment>

      {!selectedModule ? null : selectedModule.inputs.length === 0 ? null :
        <div className={classes.MenuHeader}>inputs</div>
      }

      {!selectedModule ? null : selectedModule.inputs.map((connectionID, index) => {
        const { fromID, param, outputIndex, actualOutputID: containerOutputChildID, actualInputID: containerInputChildID } = connections[connectionID]
        const name = modules[fromID].name
        return (
          <div className={classes.Connection}
            key={fromID + param + 'inp' + index}
            onClick={() => {
              dispatch(removeConnection(connectionID))
              disconnect(am[containerOutputChildID ? containerOutputChildID : fromID] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : selectedModule.id] as ConnectingAudioModule, param, outputIndex)
            }}
          >
            {`${name}${containerOutputChildID ? ` - ${modules[containerOutputChildID].name}` : ''}${param.length !== 0 ? ` - ${param}` : ''}`}
          </div>
        )
      })}

      {!selectedModule ? null : selectedModule.outputs.length === 0 ? null :
        <div className={classes.MenuHeader}>outputs</div>
      }

      {!selectedModule ? null : selectedModule.outputs.map((connectionID, index) => {
        const { toID, param, outputIndex, actualOutputID: containerOutputChildID, actualInputID: containerInputChildID } = connections[connectionID]
        const name = modules[toID].name
        return (
          <div className={classes.Connection}
            key={toID + param + 'out' + index}
            onClick={() => {
              dispatch(removeConnection(connectionID))
              disconnect(am[containerOutputChildID ? containerOutputChildID : selectedModule.id] as ConnectingAudioModule, am[containerInputChildID ? containerInputChildID : toID] as ConnectingAudioModule, param, outputIndex)
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