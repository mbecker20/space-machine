import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnyModule, RootState } from '../../../redux/stateTSTypes'
import CenterMenu from '../CenterMenu/CenterMenu'
import ConnectedModules from './ConnectedModules/ConnectedModules'
import useJSS from './ConnectedModules/style'

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
  window.openConnectionMenu = (fromID, toID) => {
    setData(makeData(true, modules[fromID], modules[toID]))
  }
  const onClose = () => { setData(makeData(false)) }
  const classes = useJSS()
  return (
    <CenterMenu header='add connection' isClosed={!isOpen} onClose={onClose}>
      <ConnectedModules fromMod={fromMod as AnyModule} toMod={toMod as AnyModule} />
    </CenterMenu>
  )
}

export default ConnectionMenu