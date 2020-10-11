import React, { Fragment } from 'react'
import { RootState } from '../../../redux/stateTSTypes'
import { useDispatch, useSelector } from 'react-redux'
import { markContainerInput, unmarkContainerInput, markContainerOutput, unmarkContainerOutput } from '../../../redux/allActions'
import CSS from 'csstype'
import { sizes } from '../../../theme/theme'
import MarkContainerControls from './MarkContainerControls'
import Switch from '../../Switch/Switch'
import useJSS from './style'
import FlexRow from '../../Flex/FlexRow'

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
  const showingContainerInput = selectedModule.connectionInputs.length !== 0
  const showingContainerOutput = selectedModule.connectionOutputs.length !== 0
  const classes = useJSS()
  return (
    window.fillContainerID !== baseContainerID ?
    <Fragment>
      <MarkContainerControls selectedModule={selectedModule} />
      {!showingContainerInput && !showingContainerOutput ?  null :
      <div
        className={classes.MenuHeader}
      >mark as container io</div>
      }
      <FlexRow justifyContent='center'>
        {!showingContainerInput ? null :
        <Switch style={switchStyle}
          fontSize={ sizes.text.xsmall }
          key={selectedModule.id + 'inputSwitch'}
          text={'input'} 
          initState={selectedModule.isContainerInput}
          onSwitch={(newState) => {
            if (newState) {
              dispatch(markContainerInput(selectedModule.id))
            } else {
              dispatch(unmarkContainerInput(selectedModule.id))
            }
          }}
        />}
        {!showingContainerOutput ? null :
        <Switch style={switchStyle}
          fontSize={ sizes.text.xsmall }
          key={selectedModule.id + 'outputSwitch'}
          text={'output'}
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
      </FlexRow>
    </Fragment>
    :
    null
  )
}

export default MarkContainerIO