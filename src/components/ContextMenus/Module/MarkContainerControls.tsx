import React, { Fragment } from 'react'
import { sizes } from '../../../theme/theme'
import { Module, ContainerModule, RootState, ContainerControl } from '../../../redux/stateTSTypes'
import { useDispatch, useSelector } from 'react-redux'
import { markContainerControl, unmarkContainerControl } from '../../../redux/allActions'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import Button from '../../Button/Button'
import FlexRow from '../../Flex/FlexRow'
import Switch from '../../Switch/Switch'
import FlexCol from '../../Flex/FlexCol'
import useJSS from './style'

interface Props {
  selectedModule: Module
}


function MarkContainerControls({ selectedModule }: Props) {
  const dispatch = useDispatch()
  const modules = useSelector((state: RootState) => state.modules)
  const classes = useJSS()
  const open = selectedModule.moduleType === CONTAINER ? 
    (selectedModule as ContainerModule).containerControls.length !== 0 
    :
    Object.keys(selectedModule.controlData).length !== 0
  return (
    <Fragment>
      {!open ? null :
      <FlexCol>
        <div className={classes.MenuHeader}> mark as container control </div>
        <FlexRow style={{ flexWrap: 'wrap', justifyContent: 'center', maxWidth: '40vmin' }}>
          {
            selectedModule.moduleType === CONTAINER ?
            (selectedModule as ContainerModule).containerControls.map((control, index) => {
              const { modID, controlID, actualModID, name, markedToContainer } = control
              const modName = modules[modID].name
              let containerControl: ContainerControl
              const isMarked = markedToContainer ? true : false
              if (isMarked) {
                containerControl = (modules[selectedModule.parentID as string] as ContainerModule).containerControls.filter(containerControl => {
                  return (
                    containerControl.controlID === controlID &&
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
                    <Button style={{ fontSize: sizes.text.small }}
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
          selectedModule.moduleType === CONTAINER ? null :
          Object.keys(selectedModule.controlData).map((controlID, index) => {
            const isMarked = selectedModule.controlData[controlID].markedToContainer ? true : false
            let containerControl: ContainerControl
            if (isMarked) {
              containerControl = (modules[selectedModule.parentID as string] as ContainerModule).containerControls.filter(containerControl => {
                return (
                  containerControl.controlID === controlID &&
                  containerControl.actualModID === selectedModule.id
                )
              })[0]
            }
            return (
              <FlexRow key={index}>
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
                  <Button style={{ fontSize: sizes.text.small }}
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
        </FlexRow>
      </FlexCol>}
    </Fragment>
  )
}

export default MarkContainerControls