import React, { useState } from 'react'
import { colors } from '../../../theme/theme'
import Button from '../../Button/Button'
import CenterMenu from '../CenterMenu/CenterMenu'

declare global {
  interface Window {
    openConfirmDeleteMenu: (saveName: string, onClose: () => void) => void
  }
}

function makeData(isOpen: boolean, saveName = '', onClose = () => { }) {
  return {
    isOpen,
    saveName,
    preOnClose: onClose
  }
}

function ConfirmDeleteMenu() {
  const [{ isOpen, saveName, preOnClose }, setData] = useState(makeData(false))
  window.openConfirmDeleteMenu = (saveName, onClose) => { setData(makeData(true, saveName, onClose)) }
  const onClose = () => {
    preOnClose()
    setData(makeData(false))
  }
  return (
    <CenterMenu header={`are you sure you want to delete ${saveName}?`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{ backgroundColor: colors.denyButton, marginRight: '3vmin' }}
          onClick={() => {
            onClose()
          }}
        >no</Button>
        <Button style={{ backgroundColor: colors.confirmButton }}
          onClick={() => {
            window.projectSaveService.remove(saveName)
            onClose()
          }}
        >yes</Button>
      </div>
    </CenterMenu>
  )
}

export default ConfirmDeleteMenu