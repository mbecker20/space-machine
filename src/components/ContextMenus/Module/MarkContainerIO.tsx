import React, { Fragment } from 'react'
import { RootState } from '../../../redux/stateTSTypes'
import { useDispatch, useSelector } from 'react-redux'
import { markContainerInput, unmarkContainerInput, markContainerOutput, unmarkContainerOutput } from '../../../redux/allActions'
import CSS from 'csstype'
import { sizes } from '../../../theme/theme'
import MarkContainerControls from './MarkContainerControls'
import Switch from '../../Switch/Switch'

interface Props {
  modID: string
}

const switchStyle: CSS.Properties = {
  fontSize: sizes.text.small,
  padding: '.1em',
}

function MarkContainerIO({ modID }: Props) {
  const dispatch = useDispatch()
  const baseContainerID = useSelector((state: RootState) => state.baseContainerID)
  const selectedModule = useSelector((state: RootState) => state.modules[modID])
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
            dispatch(markContainerInput(selectedModule.id))
          } else {
            dispatch(unmarkContainerInput(selectedModule.id))
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
            dispatch(markContainerOutput(selectedModule.id))
          } else {
            dispatch(unmarkContainerOutput(selectedModule.id))
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