import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import useJSS from './style'
import CenterMenu from '../CenterMenu/CenterMenu'
import Button from '../../Button/Button'

declare global {
  interface Window {
    openFileSaveMenu: () => void
    showDirectoryPicker: any
  }
}

function FileSaveMenu() {
  const [isOpen, setOpen] = useState(false)
  const [saveName, setSaveName] = useState('')
  window.openFileSaveMenu = () => {
    setSaveName(state.modules[state.baseContainerID].name)
    setOpen(true)
  }
  const onClose = () => { setOpen(false) }
  const state = useSelector((state: RootState) => state)
  const classes = useJSS()
  return (
    <CenterMenu header='save project as file'
      isClosed={!isOpen}
      onClose={onClose}
    >
      <input className={classes.CenterMenuInput}
        placeholder={state.modules[state.baseContainerID].name}
        value={saveName}
        onChange={e => {
          setSaveName(e.target.value)
        }}
      />
      <Button
        onClick={async () => {
          if (!window.saveDirectoryHandle) {
            window.saveDirectoryHandle = await window.showDirectoryPicker()
          }
          const fileHandle = await window.saveDirectoryHandle.getFileHandle(`${saveName}.sm`, { create: true })
          const writable = await fileHandle.createWritable()
          await writable.write(JSON.stringify(state))
          await writable.close()
        }}
      >save</Button>
    </CenterMenu>
  )
}

export default FileSaveMenu