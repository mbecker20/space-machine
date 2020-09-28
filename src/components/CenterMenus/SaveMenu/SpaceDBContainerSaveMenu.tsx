import React, { useState, useRef, Fragment } from 'react'
import CenterMenu from '../CenterMenu/CenterMenu'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { getContainerModulesConnections } from '../../../redux/getContainerAsProject'
import { sizes, colors } from '../../../theme/theme'
import { confirmContainerSaveName } from './helpers'
import useJSS from './style'
import Button from '../../Button/Button'

declare global {
  interface Window {
    openSpaceDBContainerSaveMenu: (saveList: string[], id: string, onClose: () => void) => void
  }
}

function makeData(isOpen: boolean, id = '', saveList: string[] = [], onClose = () => { }) {
  return {
    isOpen,
    id,
    saveList,
    preOnClose: onClose,
  }
}

function SpaceDBContainerSaveMenu() {
  const [{ isOpen, id, saveList, preOnClose }, setData] = useState(makeData(false))
  window.openSpaceDBContainerSaveMenu = (saveList, id, onClose) => { setData(makeData(true, id, saveList, onClose)) }
  const onClose = () => {
    preOnClose()
    setData(makeData(false)) 
  }
  const state = useSelector((state: RootState) => state)
  const initName = state.modules[id].name
  const [name, setName] = useState(initName)
  const [confirmSaveData, setConfirmSaveData] = useState({ isOpen: false, message: '' })
  const inputRef = useRef<HTMLInputElement>(null)
  const classes = useJSS()
  return (
    <CenterMenu header='save container module'
      isOpen={isOpen}
      onClose={onClose}
    >
      <input className={classes.CenterMenuInput}
        value={name}
        placeholder={initName}
        ref={inputRef}
        onChange={e => {
          setName(e.target.value)
        }}
        onKeyDown={e => {
          switch (e.key) {
            case 'Enter': // enter
              confirmContainerSaveName(setConfirmSaveData, id, name, saveList, state, onClose)
              break
            case 'Escape': // escape
              onClose()
              break
          }
        }}
        autoFocus
      />
      <Button
        onClick={() => {
          confirmContainerSaveName(setConfirmSaveData, id, name, saveList, state, onClose)
        }}
      >confirm</Button>
      {
        !confirmSaveData.isOpen ? null :
        <Fragment>
          <div
            style={{ fontSize: sizes.text.small }}
          >
            { confirmSaveData.message }
          </div>
          <div style={{ display: 'flex' }}>
            <Button style={{ backgroundColor: colors.denyButton }}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = ''
                  inputRef.current.focus()
                }
                setConfirmSaveData({ isOpen: false, message: '' })
              }}
            >no</Button>
            <Button style={{ backgroundColor: colors.confirmButton }}
              onClick={() => {
                const { modules, connections } = getContainerModulesConnections(state, id)
                window.containerSaveService.update(name, {
                  saveName: name,
                  containerID: id,
                  modules,
                  connections,
                }).then((success: string) => {
                  if (success) {
                    window.flashNotification('green', 'module updated')
                    window.refreshSpaceDBModules()
                  }
                })
                onClose()
              }}
            >yes</Button>
          </div>
        </Fragment>
      }
    </CenterMenu>
  )
}

export default SpaceDBContainerSaveMenu