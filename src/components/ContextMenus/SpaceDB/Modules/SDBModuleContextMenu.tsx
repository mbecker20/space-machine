import React, { useRef, useState } from 'react'
import { zIndex } from '../../../../theme/zIndex'
import Conditional from '../../../Conditional/Conditional'
import ContextMenu, { Location } from '../../ContextMenu/ContextMenu'
import { getLocation } from '../../ContextMenu/helpers'
import { MouseDivEvent } from '../../types'
import ModuleDeleteButton from './ModuleDeleteButton'

declare global {
  interface Window {
    openSDBModuleContextMenu: (event: MouseDivEvent, saveName: string) => void
  }
}

function makeData(isOpen: boolean, location?: Location, saveName?: string) {
  return {
    isOpen,
    location,
    saveName
  }
}

function SDBModuleContextMenu() {
  const [{ isOpen, location, saveName }, setData] = useState(makeData(false))
  const cmRef = useRef<HTMLDivElement>(null)
  window.openSDBModuleContextMenu = (event, saveName) => {
    const newLocation = getLocation(event, cmRef)
    setData(makeData(true, newLocation, saveName)) 
  }
  const onClose = () => setData(makeData(false))
  return (
    <Conditional showIf={isOpen}>
      <ContextMenu cmRef={cmRef} location={location as Location}
        onClose={() => setData(makeData(false))}
        bounderStyle={{ zIndex: zIndex.centerMenu + 1 }}
      >
        <ModuleDeleteButton saveName={saveName as string} onClose={onClose}/>
      </ContextMenu>
    </Conditional>
  )
}

export default SDBModuleContextMenu