import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../all'
import { connect } from '../../audioModules/connection'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectingAudioModule, CONTAINER } from '../../audioModules/moduleTypes'
import { addConnection } from '../../redux/allActions'
import CSS from 'csstype'
import { RootState } from '../../redux/stateTSTypes'

interface Props {
  fromID: string
  toID: string
  onClose: () => void
}

export const CHOOSE_OUTPUT = 'CHOOSE_OUTPUT'
export const CHOOSE_CONTAINER_OUTPUT = 'CHOOSE_CONTAINER_OUTPUT'
export const CONNECT_TO = 'CONNECT_TO'
export const CHOOSE_PARAM = 'CHOOSE_PARAM'
export const CHOOSE_INPUT = 'CHOOSE_INPUT'
export const CHOOSE_CONTAINER_INPUT = 'CHOOSE_CONTAINER_INPUT' // todo

const buttonStyle: CSS.Properties = {
  
}

function ConnectionMenu({ fromID, toID, onClose }: Props) {
  const am = window.audioModules
  const [outputIndex, setOutputIndex] = useState(0)
  const [inputIndex, setInputIndex] = useState(0)
  const [containerOutputIndex, setContainerOutputIndex] = useState(0)
  const [containerInputIndex, setContainerInputIndex] = useState(0)
  const dispatch = useDispatch()
  const modules = useSelector((state: RootState) => state.modules)
  const fromMod = modules[fromID]
  const toMod = modules[toID]
  const initMenu = fromMod.connectionOutputs.length > 1 ? CHOOSE_OUTPUT :
    toMod.connectionInputs.length > 1 ? CHOOSE_INPUT : CONNECT_TO
  const [openMenu, setOpenMenu] = useState(initMenu)
  const isFromContainer = fromMod.moduleType === CONTAINER
  const isToContainer = toMod.moduleType === CONTAINER
  return (
    <Fragment>
      {openMenu === CHOOSE_OUTPUT
      ?
      <CenterMenu header={'choose output'} onClose={onClose}>
        {fromMod.connectionOutputs.map((outputID, index) => {
          return (
            <Button style={buttonStyle}
              key={fromID + toID + outputID}
              onClick={(e) => {
                e.stopPropagation()
                if (isFromContainer) {
                  setContainerOutputIndex(index)
                } else {
                  setOutputIndex(index)
                }
                if (toMod.connectionInputs.length > 1) {
                  setOpenMenu(CHOOSE_INPUT)
                } else {
                  setOpenMenu(CONNECT_TO)
                }
              }}
            >{isFromContainer ? modules[outputID].name : outputID}</Button>
          )
        })}
      </CenterMenu>
      :
      openMenu === CHOOSE_INPUT
      ?
      <CenterMenu header={'choose input'} onClose={onClose}>
        {toMod.connectionInputs.map((inputID, index) => {
          return (
            <Button style={buttonStyle}
              key={fromID + toID + inputID}
              onClick={(e) => {
                e.stopPropagation()
                if (isToContainer) {
                  setContainerInputIndex(index)
                } else {
                  setInputIndex(index)
                }
                setOpenMenu(CONNECT_TO)
              }}
            >{isToContainer ? modules[inputID].name : inputID}</Button>
          )
        })}
      </CenterMenu>
      :
      openMenu === CONNECT_TO
      ?
      <CenterMenu header={`connect ${isFromContainer ? fromMod.name + ' - ' + modules[fromMod.connectionOutputs[outputIndex]].name : fromMod.name} to ${isToContainer ? toMod.name + ' - ' + modules[toMod.connectionInputs[inputIndex]].name : toMod.name}`} onClose={onClose}>
        {(isToContainer ? modules[toMod.connectionInputs[inputIndex]].connectionInputs.length === 0 : toMod.connectionInputs.length === 0) ? null :
        <Button style={buttonStyle}
          onClick={() => {
            connect(
              (isFromContainer ? am[fromMod.connectionOutputs[containerOutputIndex]] : am[fromMod.id]) as ConnectingAudioModule, 
              (isToContainer ? am[toMod.connectionInputs[containerInputIndex]] : am[toMod.id]) as ConnectingAudioModule,
              '',
              outputIndex,
              inputIndex,
            )
            dispatch(addConnection(
              fromID, 
              toID, 
              '', 
              outputIndex, 
              inputIndex, 
              isFromContainer ? fromMod.connectionOutputs[containerOutputIndex] : undefined, 
              isToContainer ? toMod.connectionInputs[containerInputIndex] : undefined,
            ))
            onClose()
          }}
        >module</Button>}
        {
        !isToContainer ? (am[toID].connectingParamIDs.length === 0 ? null :
        <Button style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(CHOOSE_PARAM)
          }}
        >params</Button>)
        :
        am[toMod.connectionInputs[inputIndex]].connectingParamIDs.length === 0 ? null :
        <Button style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(CHOOSE_PARAM)
          }}
        >params</Button>
        }
      </CenterMenu>
      :
      openMenu === CHOOSE_PARAM
      ?
      <CenterMenu header={'props'} onClose={onClose}>
        {(isToContainer ? am[toMod.connectionInputs[containerInputIndex]] : am[toID]).connectingParamIDs.map((paramID, key) => {
          return (
            <Button style={buttonStyle}
              key={fromID + toID + key}
              onClick={() => {
                connect(
                  (isFromContainer ? am[fromMod.connectionOutputs[containerOutputIndex]] : am[fromMod.id]) as ConnectingAudioModule,
                  (isToContainer ? am[toMod.connectionInputs[containerInputIndex]] : am[toMod.id]) as ConnectingAudioModule,
                  paramID,
                  outputIndex,
                  inputIndex,
                )
                dispatch(addConnection(
                  fromID,
                  toID,
                  paramID,
                  outputIndex,
                  inputIndex,
                  isFromContainer ? fromMod.connectionOutputs[containerOutputIndex] : undefined,
                  isToContainer ? toMod.connectionInputs[containerInputIndex] : undefined,
                ))
                onClose()
              }}
            >{paramID}</Button>
          )
        })}
      </CenterMenu>
      :
      null
      }
    </Fragment>
  )
}

export default ConnectionMenu