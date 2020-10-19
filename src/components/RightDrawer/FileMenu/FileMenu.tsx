import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import FlexRow from '../../Flex/FlexRow'
import BlankProjectButton from './BlankProjectButton'
import OpenFileButton from './OpenFileButton'
import SaveAsNewButton from './SaveAsNewButton'
import SaveCurrentButton from './SaveCurrentButton'

declare global {
  interface Window {
    showOpenFilePicker: any
    showSaveFilePicker: any
    saveDirectoryHandle?: any
    saveFileHandle?: any
    reRenderFileMenu: () => void
  }
}

function FileMenu() {
  const state = useSelector((state: RootState) => state)
  const [, toReRender] = useState({})
  window.reRenderFileMenu = () => { toReRender({}) }
  return (
    <FlexRow alignItems='center' flexWrap='wrap' style={{ width: '100%' }}>
      <OpenFileButton state={state} reRender={window.reRenderFileMenu} />
      <SaveAsNewButton state={state} reRender={window.reRenderFileMenu}/>
      <SaveCurrentButton state={state} />
      <BlankProjectButton />
    </FlexRow>
  )
}

export default FileMenu