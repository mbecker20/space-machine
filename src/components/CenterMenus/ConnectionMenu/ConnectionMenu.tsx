import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../../../audioModules/connection'
import { ConnectingAudioModule, CONTAINER } from '../../../audioModules/moduleTypes'
import { addConnection } from '../../../redux/allActions'
import { AnyModule, RootState } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import FlexRow from '../../Flex/FlexRow'
import CenterMenu from '../CenterMenu/CenterMenu'
import ChooseInput from './ChooseIO/ChooseInput'
import ChooseOutput from './ChooseIO/ChooseOutput'
import ConnectedModules from './ConnectedModules/ConnectedModules'
import { connectionExists } from './helpers'
import ContainerInModule from './Modules/ContainerInModule'
import ContainerOutModule from './Modules/ContainerOutModule'
import InModule from './Modules/InModule'
import OutModule from './Modules/OutModule'
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
        {fromMod?.moduleType === CONTAINER ? 
          <ContainerOutModule modID={fromMod?.id as string} startsBig={true} isBase={true}/>
        :
          <OutModule modID={fromMod?.id as string} startsBig={true}/>
        }
        {toMod?.moduleType === CONTAINER ?
          <ContainerInModule modID={toMod?.id as string} startsBig={true}/>
        :
          <InModule modID={toMod?.id as string} startsBig={true}/>
        }
      </FlexRow>
    </CenterMenu>
  )
}

export default ConnectionMenu