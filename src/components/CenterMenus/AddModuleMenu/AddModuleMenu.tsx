import React, { useEffect, useRef, useState } from 'react'
import LeftBar from './LeftBar'
import IconRouter from './IconRouter'
import SearchBar from './SearchBar'
import useJSS from './style'
import { useSpring } from 'react-spring'
import CenterMenu from '../CenterMenu/CenterMenu'
import FlexRow from '../../Flex/FlexRow'
import FlexCol from '../../Flex/FlexCol'
import { zIndex } from '../../../theme/zIndex'

declare global {
  interface Window {
    openAddModuleMenu: (row: number, col: number) => void
    refreshSpaceDBModules: () => void
  }
}

export const EFFECTS = 'effects'
export const SOURCES = 'sources'
export const UTILITY = 'utility'
export const SPACEDB_MODULES = 'spaceDB'
export const SEARCH = 'search'

export const addModuleMenuGroups = [
  EFFECTS, SOURCES, UTILITY, SPACEDB_MODULES,
]

function makeData(isOpen: boolean, row?: number, col?: number) {
  return {
    isOpen,
    row,
    col,
  }
}

function AddModuleMenu() {
  const [{ isOpen, row, col }, setData] = useState(makeData(false))
  const searchRef = useRef<HTMLInputElement>(null)
  window.openAddModuleMenu = (row, col) => {
    setData(makeData(true, row, col))
    if (searchRef.current) searchRef.current.focus()
  }
  const onClose = () => { setData(makeData(false)) }
  const [selectedGroup, setSG] = useState(EFFECTS)
  const [query, setQuery] = useState('') // used with the search bar
  const [spaceDBModules, setSpaceDBModules] = useState<string[]>([])
  window.refreshSpaceDBModules = () => {
    window.containerSaveService.find().then((saveNames: string[]) => { setSpaceDBModules(saveNames) })
  }
  const styleSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: {
      tension: 270,
    }
  })
  useEffect(() => {
    window.refreshSpaceDBModules()
  }, [])
  const classes = useJSS()
  return (
    <CenterMenu header='add module'
      onClose={onClose}
      bounderStyle={Object.assign({}, styleSpring, {
        zIndex: isOpen ? zIndex.centerMenu : zIndex.background - 1,
      })}
    >
      <FlexRow>
        <FlexCol className={classes.RouterBounder}>
          <SearchBar selectedGroup={selectedGroup} setSG={setSG} setQuery={setQuery} searchRef={searchRef} onClose={onClose} />
          <LeftBar selectedGroup={selectedGroup} setSG={setSG} />
        </FlexCol>
        <IconRouter 
          selectedGroup={selectedGroup} 
          row={row as number} col={col as number} 
          onClose={onClose} query={query} 
          spaceDBModules={spaceDBModules} 
        />
      </FlexRow>
    </CenterMenu>
  )
}

export default AddModuleMenu