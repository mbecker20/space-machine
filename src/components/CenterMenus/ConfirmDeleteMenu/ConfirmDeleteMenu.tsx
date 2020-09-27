import React from 'react'
import { colors } from '../../../theme/theme'
import Button from '../../Button/Button'
import CenterMenu from '../CenterMenu/CenterMenu'

interface Props {
  saveName: string
  onClose: () => void
}

function ConfirmDeleteMenu({ saveName, onClose }: Props) {
  return (
    <CenterMenu header={`are you sure you want to delete ${saveName}?`}
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