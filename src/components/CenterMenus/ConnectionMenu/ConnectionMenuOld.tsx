import React, { Fragment, useState } from 'react'
import { connect } from '../../../audioModules/connection'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectingAudioModule, CONTAINER } from '../../../audioModules/moduleTypes'
import { addConnection } from '../../../redux/allActions'
import { Module, RootState } from '../../../redux/stateTSTypes'
import IORecursion from './ChooseIO/IORecursion'
import useJSS from './style'
import { connectionExists } from './helpers'
import CenterMenu from '../CenterMenu/CenterMenu'
import Button from '../../Button/Button'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
  }
}

export const CHOOSE_OUTPUT = 'CHOOSE_OUTPUT'
export const CONNECT_TO = 'CONNECT_TO'
export const CHOOSE_PARAM = 'CHOOSE_PARAM'
export const CHOOSE_INPUT = 'CHOOSE_INPUT'

function makeData(isOpen: boolean, fromID = '', toID = '') {
  return {
    isOpen,
    fromID,
    toID,
  }
}

function ConnectionMenu() {
  const [{ isOpen, fromID, toID }, setData] = useState(makeData(false))
  const onClose = () => { setData(makeData(false)) }
  const classes = useJSS()
  const am = window.audioModules
  const { modules, connections } = useSelector((state: RootState) => state)
  const [fromMod, setFromMod] = useState<Module | undefined>(undefined)
  const [toMod, setToMod] = useState<Module | undefined>(undefined)
  const [outputIndex, setOutputIndex] = useState(0)
  const [inputIndex, setInputIndex] = useState(0)
  const [actualFromID, setActualFromID] = useState('')
  const [actualToID, setActualToID] = useState('')
  const dispatch = useDispatch()
  const isFromContainer = fromMod ? fromMod.moduleType === CONTAINER : false
  const isToContainer = toMod ? toMod.moduleType === CONTAINER : false
  const [openMenu, setOpenMenu] = useState('')
  window.openConnectionMenu = (fromID, toID) => {
    const fromMod = modules[fromID]
    const toMod = modules[toID]
    const newMenu = fromMod.connectionOutputs.length > 1 || isFromContainer ? CHOOSE_OUTPUT :
      toMod.connectionInputs.length > 1 || isToContainer ? CHOOSE_INPUT : CONNECT_TO
    console.log(fromMod)
    setData(makeData(true, fromID, toID))
    setFromMod(fromMod)
    setToMod(toMod)
    setActualFromID(fromID)
    setActualToID(toID)
    setOpenMenu(newMenu)
    setOutputIndex(0)
    setInputIndex(0)
  }
  return (
    <Fragment>
      {openMenu === CHOOSE_OUTPUT
      ?
      <CenterMenu header={'choose output'} isClosed={!isOpen} onClose={onClose}>
        <div className={classes.IORecursionBounder}>
          {(fromMod as Module).connectionOutputs.map((outputID, index) => {
            if (isFromContainer) {
              return (
                <IORecursion key={outputID + 'output'} id={isFromContainer ? outputID : fromID} isOutput={true}
                  setConnection={(actualIOID, ioIndex) => {
                    setActualFromID(actualIOID)
                    setOutputIndex(ioIndex)
                    if ((toMod as Module).connectionInputs.length > 1 || (toMod as Module).moduleType === CONTAINER) {
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
                    if ((toMod as Module).connectionInputs.length > 1 || (toMod as Module).moduleType === CONTAINER) {
                      setOpenMenu(CHOOSE_INPUT)
                    } else {
                      setOpenMenu(CONNECT_TO)
                    }
                  }}
                >
                  {(fromMod as Module).connectionOutputs[index]}
                </Button>
              )
            }
          })}
        </div>
      </CenterMenu>
      :
      openMenu === CHOOSE_INPUT
      ?
      <CenterMenu header={'choose input'} isClosed={!isOpen} onClose={onClose}>
        <div className={classes.IORecursionBounder}>
          {(toMod as Module).connectionInputs.map((inputID, index) => {
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
                  {(toMod as Module).connectionInputs[index]}
                </Button>
              )
            }
          })}
        </div>
      </CenterMenu>
      :
      openMenu === CONNECT_TO
      ?
      <CenterMenu header={`connect ${isFromContainer ? (fromMod as Module).name + ' - ' + modules[actualFromID].name : (fromMod as Module).name} to ${isToContainer ? (toMod as Module).name + ' - ' + modules[actualToID].name : (toMod as Module).name}`}
        isClosed={!isOpen}
        onClose={onClose}
      >
        {(isToContainer ? modules[(toMod as Module).connectionInputs[inputIndex]].connectionInputs.length === 0 : (toMod as Module).connectionInputs.length === 0) ? null :
        <Button
          onClick={() => {
            if (!connectionExists(connections, fromMod as Module, actualToID)) {
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
        <Button
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
      <CenterMenu header={'props'} isClosed={!isOpen} onClose={onClose}>
        {am[actualToID].connectingParamIDs.map((paramID, key) => {
          return (
            <Button
              key={fromID + toID + key}
              onClick={() => {
                if (!connectionExists(connections, fromMod as Module, actualToID, paramID)) {
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