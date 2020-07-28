import React, { Fragment } from 'react'
import { Module } from '../../redux/stateTSTypes'
import { Switch } from '../all'
import { useDispatch } from 'react-redux'
import { markContainerInput, unmarkContainerInput, markContainerOutput, unmarkContainerOutput } from '../../redux/allActions'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import MarkContainerControls from './MarkContainerControls'

interface Props {
  baseContainerID: string
  selectedModule: Module
}

const switchStyle: CSS.Properties = {
  fontSize: sizes.text.xsmall,
  padding: '1vmin',
}

function MarkContainerIO({ baseContainerID, selectedModule }: Props) {
  const dispatch = useDispatch()
  return (
    (selectedModule && window.fillContainerID !== baseContainerID) ?
    <Fragment>
      {
      Object.keys(window.audioModules[selectedModule.id]).length === 0 ? null :
      <MarkContainerControls selectedModule={selectedModule} />
      }
      {
      selectedModule.connectionInputs.length === 0 ? null :
      <Switch style={switchStyle}
        key={selectedModule.id + 'inputSwitch'}
        text={'mark as container input'} 
        initState={selectedModule.isContainerInput}
        onSwitch={(newState) => {
          if (newState) {
            dispatch(markContainerInput(window.highlightedID))
          } else {
            dispatch(unmarkContainerInput(window.highlightedID))
          }
        }}
      />
      }
      {
      selectedModule.connectionOutputs.length === 0 ? null :
      <Switch style={switchStyle}
        key={selectedModule.id + 'outputSwitch'}
        text={'mark as container output'}
        initState={selectedModule.isContainerOutput}
        onSwitch={(newState) => {
          if (newState) {
            dispatch(markContainerOutput(window.highlightedID))
          } else {
            dispatch(unmarkContainerOutput(window.highlightedID))
          }
        }}
      />
      }
    </Fragment>
    :
    null
  )
}

export default MarkContainerIO