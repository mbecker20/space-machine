import React, { RefObject, useEffect, useState } from 'react'
import { CenterMenu, FlexCol, FlexRow } from '../../all'
import LeftBar from './LeftBar'
import IconRouter from './IconRouter'
import SearchBar from './SearchBar'
import useJSS from './style'
import { useSpring } from 'react-spring'

declare global {
  interface Window {
    refreshSpaceDBModules: () => void
  }
}

interface Props {
  isOpen: boolean
  onClose: () => void
  row: number
  col: number
  searchRef: RefObject<HTMLInputElement>
}

export const EFFECTS = 'effects'
export const SOURCES = 'sources'
export const UTILITY = 'utility'
export const SPACEDB_MODULES = 'spaceDB'
export const SEARCH = 'search'

export const addModuleMenuGroups = [
  EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES,
]

function AddModuleMenu({ isOpen, onClose, row, col, searchRef }: Props) {
  const [selectedGroup, setSG] = useState(EFFECTS)
  const [query, setQuery] = useState('') // used with the search bar
  const [spaceDBModules, setSpaceDBModules] = useState<string[]>([])
  window.refreshSpaceDBModules = () => {
    window.containerSaveService.find().then((saveNames: string[]) => { setSpaceDBModules(saveNames) })
  }
  const styleSpring = useSpring({
    opacity: isOpen ? 1 : 0,
  })
  useEffect(() => {
    window.refreshSpaceDBModules()
  }, [])
  const classes = useJSS()
  return (
    <CenterMenu header='add module' onClose={onClose}
      bounderStyle={Object.assign({}, styleSpring, {
        zIndex: isOpen ? 1000 : -1000,
      })}
    >
      <FlexRow>
        <FlexCol className={classes.RouterBounder}>
          <SearchBar selectedGroup={selectedGroup} setSG={setSG} setQuery={setQuery} searchRef={searchRef} onClose={onClose} />
          <LeftBar selectedGroup={selectedGroup} setSG={setSG} />
        </FlexCol>
        <IconRouter selectedGroup={selectedGroup} row={row} col={col} onClose={onClose} query={query} spaceDBModules={spaceDBModules} />
      </FlexRow>
    </CenterMenu>
  )
}

export default AddModuleMenu