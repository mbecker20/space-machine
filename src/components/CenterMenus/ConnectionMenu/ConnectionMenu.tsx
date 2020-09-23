import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../../all'
import { connect } from '../../../audioModules/connection'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectingAudioModule, CONTAINER } from '../../../audioModules/moduleTypes'
import { addConnection } from '../../../redux/allActions'
import CSS from 'csstype'
import { RootState } from '../../../redux/stateTSTypes'
import IORecursion from './IORecursion'
import useJSS from './style'
import { connectionExists } from './helpers'

interface Props {
  fromID: string
  toID: string
  onClose: () => void
}

export const CHOOSE_OUTPUT = 'CHOOSE_OUTPUT'
export const CONNECT_TO = 'CONNECT_TO'
export const CHOOSE_PARAM = 'CHOOSE_PARAM'
export const CHOOSE_INPUT = 'CHOOSE_INPUT'

const buttonStyle: CSS.Properties = {
  
}

function ConnectionMenu({ fromID, toID, onClose }: Props) {
  const classes = useJSS()
  const am = window.audioModules
  const { modules, connections } = useSelector((state: RootState) => state)
  const fromMod = modules[fromID]
  const toMod = modules[toID]
  const [outputIndex, setOutputIndex] = useState(0)
  const [inputIndex, setInputIndex] = useState(0)
  const [actualFromID, setActualFromID] = useState(fromID)
  const [actualToID, setActualToID] = useState(toID)
  const dispatch = useDispatch()
  const isFromContainer = fromMod.moduleType === CONTAINER
  const isToContainer = toMod.moduleType === CONTAINER
  const initMenu = fromMod.connectionOutputs.length > 1 || isFromContainer ? CHOOSE_OUTPUT :
    toMod.connectionInputs.length > 1 || isToContainer ? CHOOSE_INPUT : CONNECT_TO
  const [openMenu, setOpenMenu] = useState(initMenu)
  return (
    <Fragment>
      {openMenu === CHOOSE_OUTPUT
      ?
      <CenterMenu header={'choose output'} onClose={onClose}>
        <div className={classes.IORecursionBounder}>
          {fromMod.connectionOutputs.map((outputID, index) => {
            if (isFromContainer) {
              return (
                <IORecursion key={outputID + 'output'} id={isFromContainer ? outputID : fromID} isOutput={true}
                  setConnection={(actualIOID, ioIndex) => {
                    setActualFromID(actualIOID)
                    setOutputIndex(ioIndex)
                    if (toMod.connectionInputs.length > 1 || toMod.moduleType === CONTAINER) {
                      setOpenMenu(CHOOSE_INPUT)
                    } else {
                      setOpenMenu(CONNECT_TO)
                    }
                  }}
                />
              )
            } else {
              return (
                <Button
                  onClick={() => {
                    setOutputIndex(index)
                    if (toMod.connectionInputs.length > 1 || toMod.moduleType === CONTAINER) {
                      setOpenMenu(CHOOSE_INPUT)
                    } else {
                      setOpenMenu(CONNECT_TO)
                    }
                  }}
                >
                  {fromMod.connectionOutputs[index]}
                </Button>
              )
            }
          })}
        </div>
      </CenterMenu>
      :
      openMenu === CHOOSE_INPUT
      ?
      <CenterMenu header={'choose input'} onClose={onClose}>
        <div className={classes.IORecursionBounder}>
          {toMod.connectionInputs.map((inputID, index) => {
            if (isToContainer) {
              return (
                <IORecursion key={inputID + 'input'} id={isToContainer ? inputID : toID} isOutput={false}
                  setConnection={(actualIOID, ioIndex) => {
                    setActualToID(actualIOID)
                    setInputIndex(ioIndex)
                    setOpenMenu(CONNECT_TO)
                  }}
                />
              )
            } else {
              return (
                <Button
                  onClick={() => {
                    setInputIndex(index)
                    setOpenMenu(CONNECT_TO)
                  }}
                >
                  {toMod.connectionInputs[index]}
                </Button>
              )
            }
          })}
        </div>
      </CenterMenu>
      :
      openMenu === CONNECT_TO
      ?
      <CenterMenu header={`connect ${isFromContainer ? fromMod.name + ' - ' + modules[actualFromID].name : fromMod.name} to ${isToContainer ? toMod.name + ' - ' + modules[actualToID].name : toMod.name}`} onClose={onClose}>
        {(isToContainer ? modules[toMod.connectionInputs[inputIndex]].connectionInputs.length === 0 : toMod.connectionInputs.length === 0) ? null :
        <Button style={buttonStyle}
          onClick={() => {
            if (!connectionExists(connections, fromMod, actualToID)) {
              connect(
                am[actualFromID] as ConnectingAudioModule,
                am[actualToID] as ConnectingAudioModule,
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
                isFromContainer ? actualFromID : undefined,
                isToContainer ? actualToID : undefined,
              ))
            } else {
              alert('modules already connected')
            }
            onClose()
          }}
        >module</Button>}
        {
        am[actualToID].connectingParamIDs.length === 0 ? null
        :
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
        {am[actualToID].connectingParamIDs.map((paramID, key) => {
          return (
            <Button style={buttonStyle}
              key={fromID + toID + key}
              onClick={() => {
                if (!connectionExists(connections, fromMod, actualToID, paramID)) {
                  connect(
                    am[actualFromID] as ConnectingAudioModule,
                    am[actualToID] as ConnectingAudioModule,
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
                    isFromContainer ? actualFromID : undefined,
                    isToContainer ? actualToID : undefined,
                  ))
                } else {
                  alert('modules already connected')
                }
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