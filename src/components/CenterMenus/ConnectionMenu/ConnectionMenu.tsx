import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { AnyModule, RootState } from '../../../redux/stateTSTypes'
import FlexRow from '../../Flex/FlexRow'
import CenterMenu from '../CenterMenu/CenterMenu'
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
  const { modules } = useSelector((state: RootState) => state)
  window.openConnectionMenu = (fromID, toID) => {
    setData(makeData(true, modules[fromID], modules[toID]))
  }
  const onClose = () => {
    setData(makeData(false)) 
  }
  //const classes = useJSS()
  return (
    <CenterMenu header='add connection' isClosed={!isOpen} onClose={onClose}>
      <FlexRow>
        {fromMod?.moduleType === CONTAINER ? 
          <ContainerOutModule modID={fromMod?.id as string} startsBig={true} isBase={true}/>
        :
          <OutModule modID={fromMod?.id as string} startsBig={true} isBase={true}/>
        }
        {toMod?.moduleType === CONTAINER ?
          <ContainerInModule 
            modID={toMod?.id as string} 
            startsBig={true}
            fromID={fromMod?.id as string}
            toID={toMod?.id as string}
            isFromContainer={fromMod?.moduleType === CONTAINER}
            onClose={onClose}
          />
        :
          <InModule 
            modID={toMod?.id as string} 
            startsBig={true}
            fromID={fromMod?.id as string}
            toID={toMod?.id as string}
            isFromContainer={fromMod?.moduleType === CONTAINER}
            isToContainer={false}
            onClose={onClose}
          />
        }
      </FlexRow>
    </CenterMenu>
  )
}

export default ConnectionMenu