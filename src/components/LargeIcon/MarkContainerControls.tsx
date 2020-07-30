import React, { useState, Fragment } from 'react'
import { Button, Switch } from '../all'
import { sizes } from '../../theme/theme'
import { Module, ContainerModule } from '../../redux/stateTSTypes'
import { useDispatch } from 'react-redux'
import { markContainerControl, unmarkContainerControl } from '../../redux/allActions'
import { stringIn } from '../../helpers/genFuncs'
import { CONTAINER } from '../../audioModules/moduleTypes'

interface Props {
  selectedModule: Module
}


function MarkContainerControls({ selectedModule }: Props) {
  const [open, setOpen] = useState(false)
  const audioModule = window.audioModules[selectedModule.id]
  const dispatch = useDispatch()
  return (
    <Fragment>
      <Button style={{ fontSize: sizes.text.xsmall, marginTop: '2vmin' }}
        onClick={() => {
          setOpen(!open)
        }}
      >mark container controls</Button>
      <div>
        {
        !open ? null :
        Object.keys(audioModule.controlData).map((controlID, index) => {
          return (
            <Switch initState={stringIn(controlID, selectedModule.toContainerControls)} text={controlID}
              style={{ fontSize: sizes.text.xsmall, padding: '1vmin' }}
              key={controlID + index}
              onSwitch={isMarked => {
                if (isMarked) {
                  dispatch(markContainerControl(selectedModule.id, controlID, selectedModule.id))
                } else {
                  dispatch(unmarkContainerControl(selectedModule.id, controlID, selectedModule.id))
                }
              }} 
            />
          )
        })
        }
        {
        !open && selectedModule.moduleType === CONTAINER ? null :
          (selectedModule as ContainerModule).containerControls.map(({ modID, controlID, actualModID }, index) => {
            return (
              <Switch initState={stringIn(controlID, selectedModule.toContainerControls)} text={`${modID} - ${controlID}`}
                style={{ fontSize: sizes.text.xsmall, padding: '1vmin' }}
                key={modID + index}
                onSwitch={isMarked => {
                  if (isMarked) {
                    dispatch(markContainerControl(selectedModule.id, controlID, actualModID))
                  } else {
                    dispatch(unmarkContainerControl(selectedModule.id, controlID, actualModID))
                  }
                }}
              />
            )
          })
        }

      </div>
    </Fragment>
  )
}

export default MarkContainerControls