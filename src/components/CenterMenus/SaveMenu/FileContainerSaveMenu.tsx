import React, { useState } from 'react'
import CenterMenu from '../CenterMenu/CenterMenu'
import useJSS from './style'

declare global {
  interface Window {
    openFileContainerSaveMenu: (name: string) => void
  }
}

function FileContainerSaveMenu() {
  const [open, setOpen] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [initName, setInitName] = useState('')
  window.openFileContainerSaveMenu = (name) => {
    setInitName(name)
    setSaveName(name)
    setOpen(true) 
  }
  const onClose = () => {
    setOpen(false)
  }
  const classes = useJSS()
  return (
    <CenterMenu header='' isClosed={!open} onClose={onClose}>
      <input className={classes.CenterMenuInput}
        onChange={e => {
          setSaveName(e.target.value)
        }}
        value={saveName}
        placeholder={initName}
        onKeyDown={e => {
          switch(e.key) {
            case 'Enter': break;
            case 'Esc': break;
          }
        }}
      />
    </CenterMenu>
  )
}

export default FileContainerSaveMenu