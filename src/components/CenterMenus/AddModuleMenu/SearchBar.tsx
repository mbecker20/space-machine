import React, { RefObject } from 'react'
import { SEARCH } from './AddModuleMenu'
import useJSS from './style'

interface Props {
  selectedGroup: string
  setSG: (arg: string) => void
  setQuery: (arg: string) => void
  searchRef: RefObject<HTMLInputElement>
  onClose: () => void
}

let prevSelectedGroup: string

function SearchBar({ selectedGroup, setSG, setQuery, searchRef, onClose }: Props) {
  const classes = useJSS()
  if (selectedGroup !== SEARCH) {
    prevSelectedGroup = selectedGroup
  }
  return (
    <input className={classes.SearchBar}
      ref={searchRef}
      onChange={e => {
        if (e.target.value.length === 0) {
          setSG(prevSelectedGroup)
        } else {
          setQuery(e.target.value)
          setSG(SEARCH)
        }
      }}
      onKeyDown={e => {
        switch(e.key) {
          case 'Escape': onClose();
        }
      }}
      placeholder='search'
    />
  )
}

export default SearchBar