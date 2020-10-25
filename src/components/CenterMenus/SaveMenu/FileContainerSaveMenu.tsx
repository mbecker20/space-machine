import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { stringIn } from '../../../helpers/genFuncs'
import { RootState } from '../../../redux/stateTSTypes'
import { colors } from '../../../theme/theme'
import Button from '../../Button/Button'
import Conditional from '../../Conditional/Conditional'
import FlexCol from '../../Flex/FlexCol'
import FlexRow from '../../Flex/FlexRow'
import CenterMenu from '../CenterMenu/CenterMenu'
import { saveContainerToFile } from './helpers'
import useJSS from './style'

declare global {
  interface Window {
    openFileContainerSaveMenu: (containerModID: string) => void
  }
}

let initName = ''
let modID = ''

function FileContainerSaveMenu() {
  const [open, setOpen] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false) 
  const state = useSelector((state: RootState) => state) 
  window.openFileContainerSaveMenu = (containerModID) => {
    modID = containerModID
    initName = state.modules[containerModID].name
    setSaveName(initName)
    setConfirmOpen(false)
    setOpen(true) 
  }
  const onClose = () => {
    setOpen(false)
  }
  async function trySaveModule() {
    if (stringIn(saveName, window.fileModuleSaveNames)) {
      setConfirmOpen(true)
    } else {
      await saveContainerToFile(saveName, modID, state)
      window.flashNotification(colors.success, `${saveName} saved to file`)
      onClose()
    }
  }
  const classes = useJSS()
  const inputRef = useRef<HTMLInputElement>(null)
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
            case 'Enter': trySaveModule(); break;
            case 'Esc': onClose(); break;
          }
        }}
        ref={inputRef}
        autoFocus
      />
      <Button
        onClick={trySaveModule}
      >
        save
      </Button>
      <Conditional showIf={confirmOpen}>
        <FlexCol>
          <div>module with this name already exists. would you like to update it?</div>
          <FlexRow>
            <Button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = ''
                  inputRef.current.focus()

                }
                setConfirmOpen(false)
              }}
            >
              no
            </Button>
            <Button
              onClick={() => {
                saveContainerToFile(saveName, modID, state)
                onClose()
              }}
            >
              yes
            </Button>
          </FlexRow>
        </FlexCol>
      </Conditional>
    </CenterMenu>
  )
}

export default FileContainerSaveMenu