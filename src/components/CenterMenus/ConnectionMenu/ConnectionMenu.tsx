import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../../../audioModules/connection'
import { ConnectingAudioModule, CONTAINER } from '../../../audioModules/moduleTypes'
import { addConnection } from '../../../redux/allActions'
import { AnyModule, RootState } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import FlexRow from '../../Flex/FlexRow'
import CenterMenu from '../CenterMenu/CenterMenu'
import ConnectedModules from './ConnectedModules/ConnectedModules'
import { connectionExists } from './helpers'
import IORecursion from './IORecursion'
import useJSS from './style'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
  }
}

function makeData(isOpen: boolean, fromMod?: AnyModule, toMod?: AnyModule) {
  return {
    isOpen,
    fromMod,
    toMod,
  }
}

function ConnectionMenu() {
  const [{ isOpen, fromMod, toMod }, setData] = useState(makeData(false))
  const { modules, connections } = useSelector((state: RootState) => state)
  const [outputIndex, setOutputIndex] = useState(0)
  const [inputIndex, setInputIndex] = useState(0)
  const [actualFromID, setActualFromID] = useState('')
  const [actualToID, setActualToID] = useState('')
  window.openConnectionMenu = (fromID, toID) => {
    setData(makeData(true, modules[fromID], modules[toID]))
  }
  const onClose = () => {
    setOutputIndex(0)
    setInputIndex(0)
    setActualFromID('')
    setActualToID('')
    setData(makeData(false)) 
  }
  const classes = useJSS()
  const am = window.audioModules
  const dispatch = useDispatch()
  return (
    <CenterMenu header='add connection' isClosed={!isOpen} onClose={onClose}>
      <FlexRow>
        <div className={classes.IORecursionBounder}>
          {fromMod?.connectionOutputs.map((outputID, index) => {
            if (fromMod?.moduleType === CONTAINER) {
              return (
                <IORecursion key={outputID + 'output'} id={outputID} isOutput={true}
                  setConnection={(actualIOID, ioIndex) => {
                    setActualFromID(actualIOID)
                    setOutputIndex(ioIndex)
                  }}
                />
              )
            } else {
              return (
                <Button
                  onClick={() => {
                    setOutputIndex(index)
                  }}
                >
                  {fromMod?.connectionOutputs[index]}
                </Button>
              )
            }
          })}
        </div>
        <ConnectedModules fromMod={fromMod as AnyModule} toMod={toMod as AnyModule} />
        <div className={classes.IORecursionBounder}>
          {toMod?.connectionInputs.map((inputID, index) => {
            if (toMod?.moduleType === CONTAINER) {
              return (
                <IORecursion key={inputID + 'input'} id={inputID} isOutput={false}
                  setConnection={(actualIOID, ioIndex) => {
                    setActualToID(actualIOID)
                    setInputIndex(ioIndex)
                  }}
                />
              )
            } else {
              return (
                <Button
                  onClick={() => {
                    setInputIndex(index)
                  }}
                >
                  {fromMod?.connectionOutputs[index]}
                </Button>
              )
            }
          })}
        </div>
      </FlexRow>
      {(toMod?.moduleType === CONTAINER ? modules[toMod?.connectionInputs[inputIndex]].connectionInputs.length === 0 : toMod?.connectionInputs.length === 0) ? null :
        <Button
          onClick={() => {
            if (!connectionExists(connections, fromMod as AnyModule, actualToID)) {
              connect(
                am[actualFromID] as ConnectingAudioModule,
                am[actualToID] as ConnectingAudioModule,
                '',
                outputIndex,
                inputIndex,
              )
              dispatch(addConnection(
                fromMod?.id as string,
                toMod?.id as string,
                '',
                outputIndex,
                inputIndex,
                fromMod?.moduleType === CONTAINER ? actualFromID : undefined,
                toMod?.moduleType === CONTAINER ? actualToID : undefined,
              ))
            } else {
              alert('modules already connected')
            }
            onClose()
          }}
        >module</Button>}
      {
        am[actualToID]?.connectingParamIDs.length === 0 ? null
          :
          <Button
            onClick={(e) => {
              e.stopPropagation()
            }}
          >params</Button>
      }
    </CenterMenu>
  )
}

export default ConnectionMenu