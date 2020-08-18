import React, { useState, Fragment } from 'react'
import { Button, Switch, FlexRow, FlexCol } from '../all'
import { sizes } from '../../theme/theme'
import { Module, ContainerModule, RootState, ContainerControl } from '../../redux/stateTSTypes'
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
      <FlexCol>
        {
          open && selectedModule.moduleType === CONTAINER ?
            (selectedModule as ContainerModule).containerControls.map(({ modID, controlID, actualModID, name }, index) => {
            const modName = modules[modID].name
            const isMarked = stringIn(actualModID + controlID, selectedModule.toContainerControls)
            let containerControl: ContainerControl
            if (isMarked) {
              containerControl = (modules[selectedModule.parentID as string] as ContainerModule).containerControls.filter(containerControl => {
                return (
                  containerControl.modID === selectedModule.id ||
                  containerControl.controlID === controlID ||
                  containerControl.actualModID === actualModID
                )
              })[0]
            }
            return (
              <FlexRow>
                <Switch initState={isMarked} text={name ? name : `${modName} - ${controlID}`}
                  style={{ fontSize: sizes.text.xsmall, padding: '1vmin' }}
                  key={modID + index}
                  onSwitch={nowMarked => {
                    if (nowMarked) {
                      dispatch(markContainerControl(selectedModule.id, controlID, actualModID))
                    } else {
                      dispatch(unmarkContainerControl(selectedModule.id, controlID, actualModID))
                    }
                  }}
                />
                {
                  !isMarked ? null :
                    <Button
                      onClick={() => {
                        window.openControlRenameMenu(controlID, selectedModule.parentID as string, containerControl)
                      }}
                    >
                      edit
                </Button>
                }
              </FlexRow>
            )
          }) : null
        }
        {
        !open ? null :
        Object.keys(selectedModule.controlData).map((controlID, index) => {
          const isMarked = stringIn(selectedModule.id + controlID, selectedModule.toContainerControls)
          let containerControl: ContainerControl
          if (isMarked) {
            containerControl = (modules[selectedModule.parentID as string] as ContainerModule).containerControls.filter(containerControl => {
              return (
                containerControl.modID === selectedModule.id ||
                containerControl.controlID === controlID ||
                containerControl.actualModID === selectedModule.id
              )
            })[0]
          }
          return (
            <FlexRow>
              <Switch initState={isMarked} text={controlID}
                style={{ fontSize: sizes.text.xsmall, padding: '1vmin' }}
                key={controlID + index}
                onSwitch={nowMarked => {
                  if (nowMarked) {
                    dispatch(markContainerControl(selectedModule.id, controlID, selectedModule.id))
                  } else {
                    dispatch(unmarkContainerControl(selectedModule.id, controlID, selectedModule.id))
                  }
                }} 
              />
              {
                !isMarked ? null :
                <Button
                  onClick={() => {
                    window.openControlRenameMenu(controlID, selectedModule.parentID as string, containerControl)
                  }}
                >
                  edit
                </Button>
              }
            </FlexRow>
          )
        })
        }
      </FlexCol>
    </Fragment>
  )
}

export default MarkContainerControls