import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { AnyModule, RootState } from '../../../redux/stateTSTypes'
import ContextMenu from '../ContextMenu/ContextMenu'
import { DragDivEvent } from '../types'
import FlexRow from '../../Flex/FlexRow'
import ContainerInModule from './ContainerInModule'
import ContainerOutModule from './ContainerOutModule'
import InModule from './InModule'
import OutModule from './OutModule'

declare global {
  interface Window {
    openConnectionMenu: (event: DragDivEvent, fromID: string, toID: string) => void
  }
}

function makeData(isOpen: boolean, event?: DragDivEvent, fromMod?: AnyModule, toMod?: AnyModule) {
  return {
    isOpen,
    event,
    fromMod,
    toMod,
  }
}

function ConnectionMenu() {
  const [{ isOpen, event, fromMod, toMod }, setData] = useState(makeData(false))
  const { modules } = useSelector((state: RootState) => state)
  window.openConnectionMenu = (event, fromID, toID) => {
    setData(makeData(true, event, modules[fromID], modules[toID]))
  }
  const onClose = () => {
    setData(makeData(false)) 
  }
  return (
    <ContextMenu event={event as DragDivEvent} isOpen={isOpen} onClose={onClose}
      style={{
        padding: '.7em'
      }}
      bounderStyle={{
        backgroundColor: 'rgba(0,0,0,.4)'
      }}
    >
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
            isBase={true}
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
    </ContextMenu>
  )
}

export default ConnectionMenu