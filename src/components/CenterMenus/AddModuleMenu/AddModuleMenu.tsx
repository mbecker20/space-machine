import React, { useState } from 'react'
import { CenterMenu, FlexRow } from '../../all'
import LeftBar from './LeftBar'
import IconRouter from './IconRouter'
//import useJSS from './style'

interface Props {
  isOpen: boolean
  onClose: () => void
  row: number
  col: number
}

export const EFFECTS = 'effects'
export const SOURCES = 'sources'
export const UTILITY = 'utility'
export const SPACEDB_MODULES = 'spaceDB modules'

export const addModuleMenuGroups = [
  EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES,
]

function AddModuleMenu({ isOpen, onClose, row, col }: Props) {
  //const classes = useJSS()
  const [selectedGroup, setSG] = useState(EFFECTS)
  return (
    <CenterMenu header='add module' onClose={onClose}
      bounderStyle={{ 
        zIndex: isOpen ? 1000 : -1000,
        opacity: isOpen ? 1 : 0,
      }}
    >
      <FlexRow>
        <LeftBar selectedGroup={selectedGroup} setSG={setSG} />
        <IconRouter selectedGroup={selectedGroup} row={row} col={col} onClose={onClose} />
      </FlexRow>
    </CenterMenu>
  )
}

export default AddModuleMenu