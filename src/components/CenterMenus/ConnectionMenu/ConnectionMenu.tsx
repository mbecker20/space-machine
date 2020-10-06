import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ContainerModule, Module, RootState } from '../../../redux/stateTSTypes'
import CenterMenu from '../CenterMenu/CenterMenu'
import useJSS from './style'

declare global {
  interface Window {
    openConnectionMenu: (fromID: string, toID: string) => void
  }
}

function makeData(isOpen: boolean, fromMod?: Module | ContainerModule, toMod?: Module | ContainerModule) {
  return {
    isOpen,
    fromMod,
    toMod,
  }
}

function ConnectionMenu() {
  const [{ isOpen, fromMod, toMod }, setData] = useState(makeData(false))
  const { modules, connections } = useSelector((state: RootState) => state)
  window.openConnectionMenu = (fromID, toID) => {
    setData(makeData(true, modules[fromID], modules[toID]))
  }
  const onClose = () => { setData(makeData(false)) }
  const classes = useJSS()
  return (
    <CenterMenu header='add connection' isClosed={!isOpen} onClose={onClose}>
      
    </CenterMenu>
  )
}

export default ConnectionMenu