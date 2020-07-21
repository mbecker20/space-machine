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
      {!selectedModule ? null : selectedModule.inputs.map((inputData, key) => {
        const name = modules[inputData[0]].name
        return (
          <div className={classes.Connection}
            key={inputData[0] + key}
            onClick={() => {
              dispatch(removeConnection(inputData[0], selectedModule.id, inputData[1]))
              disconnect(am[inputData[0]] as ConnectingAudioModule, am[selectedModule.id], inputData[1])
            }}
          >
            {inputData[1].length === 0 ? name : `${name} - ${inputData[1]}`}
          </div>
        )
      })}
      {!selectedModule ? null : selectedModule.outputs.length === 0 ? null :
        <div className={classes.MenuHeader}>outputs</div>
      }
      {!selectedModule ? null : selectedModule.outputs.map((outputData, key) => {
        const name = modules[outputData[0]].name
        return (
          <div className={classes.Connection}
            key={outputData[0] + key}
            onClick={() => {
              dispatch(removeConnection(selectedModule.id, outputData[0], outputData[1]))
              disconnect(am[selectedModule.id] as ConnectingAudioModule, am[outputData[0]], outputData[1])
            }}
          >{outputData[1].length === 0 ? name : `${name} - ${outputData[1]}`}</div>
        )
      })}
    </Fragment>
  )
}

export default InputOutputView