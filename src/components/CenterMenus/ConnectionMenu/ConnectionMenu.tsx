import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../../../audioModules/connection'
import { ConnectingAudioModule, CONTAINER } from '../../../audioModules/moduleTypes'
import { addConnection } from '../../../redux/allActions'
import { AnyModule, RootState } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import FlexRow from '../../Flex/FlexRow'
import CenterMenu from '../CenterMenu/CenterMenu'
import ChooseInput from './ChooseInput'
import ChooseOutput from './ChooseOutput'
import ConnectedModules from './ConnectedModules/ConnectedModules'
import { connectionExists } from './helpers'
//import useJSS from './style'

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
    setActualFromID(fromID)
    setActualToID(toID)
    setData(makeData(true, modules[fromID], modules[toID]))
  }
  const onClose = () => {
    setOutputIndex(0)
    setInputIndex(0)
    setData(makeData(false)) 
  }
  //const classes = useJSS()
  const am = window.audioModules
  const dispatch = useDispatch()
  return (
    <CenterMenu header='add connection' isClosed={!isOpen} onClose={onClose}>
      <FlexRow>
        <ChooseOutput fromMod={fromMod} setActualFromID={setActualFromID} setOutputIndex={setOutputIndex} />
        <ConnectedModules fromMod={fromMod} toMod={toMod} />
        <ChooseInput toMod={toMod} setActualToID={setActualToID} setInputIndex={setInputIndex} />
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