import React, { useState } from 'react'
import { CenterMenu, FlexRow } from '../../all'
import LeftBar from './LeftBar'
//import useJSS from './style'

interface Props {
  onClose: () => void
  row: number
  col: number
}

const EFFECTS = 'effects'
const SOURCES = 'sources'
const UTILITY = 'utility'
const SPACEDB_MODULES = 'spaceDB modules'

export const addModuleMenuGroups = [
  EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES,
]

function AddModuleMenu({ onClose, row, col }: Props) {
  //const classes = useJSS()
  const [selectedGroup, setSG] = useState(EFFECTS)
  return (
    <CenterMenu header='add module' onClose={onClose}>
      <FlexRow>
        <LeftBar selectedGroup={selectedGroup} setSG={setSG} />
        
      </FlexRow>
    </CenterMenu>
  )
}

export default AddModuleMenu