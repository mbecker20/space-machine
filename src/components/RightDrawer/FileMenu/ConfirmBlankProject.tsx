import React, { Dispatch, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import restoreAMFromState from '../../../audioModules/restoreAMFromState'
import { saveJSONToChosenFile, saveJSONToFileHandle } from '../../../helpers/fileAccess'
import { restoreFromState } from '../../../redux/allActions'
import { createInitState } from '../../../redux/rootReducer'
import { Connections, RootState } from '../../../redux/stateTSTypes'
import { colors, sizes } from '../../../theme/theme'
import Button from '../../Button/Button'
import CenterMenu from '../../CenterMenus/CenterMenu/CenterMenu'
import FlexRow from '../../Flex/FlexRow'

declare global {
  interface Window {
    openConfirmBlankProjectMenu: () => void
  }
}

function makeBlankProject(dispatch: Dispatch<any>, connections: Connections) {
  const emptyState = createInitState(true)
  restoreAMFromState(connections, emptyState)
  dispatch(restoreFromState(emptyState))
  window.flashNotification(colors.success, 'created blank project')
  window.saveFileHandle = undefined
  window.reRenderFileMenu()
}

function ConfirmBlankProject() {
  const [isOpen, setOpen] = useState(false)
  window.openConfirmBlankProjectMenu = () => {
    setOpen(true) 
  }
  const onClose = () => {
    setOpen(false)
  }

  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  return (
    <CenterMenu isClosed={!isOpen} onClose={onClose}>
      <div 
        style={{ 
          fontSize: sizes.text.medium,
          textAlign: 'center',
        }}
      > would you like to save the current project before closing? </div>
      <FlexRow>
        <Button
          onClick={() => {
            makeBlankProject(dispatch, state.connections)
            onClose()
          }}
        >no</Button>
        <Button
          onClick={async () => {
            if (window.saveFileHandle) {
              await saveJSONToFileHandle(window.saveFileHandle, state)
            } else {
              await saveJSONToChosenFile(state)
            }
            makeBlankProject(dispatch, state.connections)
            onClose()
          }}
        >yes</Button>
      </FlexRow>
    </CenterMenu>
  )
}

export default ConfirmBlankProject