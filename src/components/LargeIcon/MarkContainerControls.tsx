import React, { useState, Fragment } from 'react'
import { Button, Switch } from '../all'
import { sizes } from '../../theme/theme'
import { Module, ContainerModule, RootState } from '../../redux/stateTSTypes'
import { useDispatch, useSelector } from 'react-redux'
import { markContainerControl, unmarkContainerControl } from '../../redux/allActions'
import { stringIn } from '../../helpers/genFuncs'
import { CONTAINER } from '../../audioModules/moduleTypes'

interface Props {
  selectedModule: Module
}


function MarkContainerControls({ selectedModule }: Props) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const modules = useSelector((state: RootState) => state.modules)
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
        Object.keys(selectedModule.controlData).map((controlID, index) => {
          return (
            <Switch initState={stringIn(selectedModule.id + controlID, selectedModule.toContainerControls)} text={controlID}
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
        open && selectedModule.moduleType === CONTAINER ?
          (selectedModule as ContainerModule).containerControls.map(({ modID, controlID, actualModID }, index) => {
            const name = modules[modID].name
            return (
              <Switch initState={stringIn(actualModID + controlID, selectedModule.toContainerControls)} text={`${name} - ${controlID}`}
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
          }) : null
        }

      </div>
    </Fragment>
  )
}

export default MarkContainerControls