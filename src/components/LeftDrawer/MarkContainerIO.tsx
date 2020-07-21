import React, { Fragment } from 'react'
import { Module } from '../../redux/stateTSTypes'
import { Switch } from '../all'
import { useDispatch } from 'react-redux'
import { markContainerInput, unmarkContainerInput, markContainerOutput, unmarkContainerOutput } from '../../redux/allActions'

interface Props {
  baseContainerID: string
  selectedModule: Module
}

function MarkContainerIO({ baseContainerID, selectedModule }: Props) {
  const dispatch = useDispatch()
  return (
    <Fragment>
      {
      window.fillContainerID === baseContainerID ? null :
      selectedModule.connectionInputs.length === 0 ? null :
      <Switch text={'mark as container input'} initState={selectedModule.isContainerInput}
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
      window.fillContainerID === baseContainerID ? null :
      selectedModule.connectionOutputs.length === 0 ? null :
      <Switch text={'mark as container output'} initState={selectedModule.isContainerOutput}
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
  )
}

export default MarkContainerIO