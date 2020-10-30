import React, { Fragment, useRef, useState } from 'react'
import Conditional from '../../../Conditional/Conditional'
import ContextMenu, { Location } from '../../ContextMenu/ContextMenu'
import { getLocation } from '../../ContextMenu/helpers'
import { MouseDivEvent } from '../../types'
import ProjectDeleteButton from './ProjectDeleteButton'

type SetSaveList = (arg: string[]) => void

declare global {
  interface Window {
    openSDBProjectContextMenu: (
      event: MouseDivEvent,
      saveName: string,
      setSaveList: SetSaveList
    ) => void
  }
}

export function makeData(
  isOpen: boolean,
  location?: Location,
  saveName?: string,
  setSaveList?: (arg: string[]) => void
) {
  return {
    isOpen,
    location,
    saveName,
    setSaveList
  }
}

function SDBProjectContextMenu() {
  const [{ isOpen, location, saveName, setSaveList }, setData] = useState(makeData(false))
  const cmRef = useRef<HTMLDivElement>(null)
  window.openSDBProjectContextMenu = (event, saveName, setSaveList) => {
    const newLocation = getLocation(event, cmRef)
    setData(makeData(true, newLocation, saveName, setSaveList)) 
  }
  const onClose = () => { setData(makeData(false)) }
  return (
    <Conditional showIf={isOpen}>
      <ContextMenu location={location as Location} cmRef={cmRef}  onClose={onClose}>
        <ProjectDeleteButton saveName={saveName as string} setSaveList={setSaveList as SetSaveList} onClose={onClose} />
      </ContextMenu>
    </Conditional>
  )
}

export default SDBProjectContextMenu