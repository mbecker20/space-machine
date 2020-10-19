import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import FlexCol from '../../Flex/FlexCol'
import OpenFileButton from './OpenFileButton'
import SaveAsNewButton from './SaveAsNewButton'
import SaveCurrentButton from './SaveCurrentButton'

declare global {
  interface Window {
    showOpenFilePicker: any
    showSaveFilePicker: any
    saveDirectoryHandle?: any
    saveFileHandle?: any
  }
}

function FileMenu() {
  const state = useSelector((state: RootState) => state)
  const [, toReRender] = useState({})
  const reRender = () => { toReRender({}) }
  return (
    <FlexCol alignItems='center'>
      <OpenFileButton state={state} reRender={reRender} />
      <SaveAsNewButton state={state} reRender={reRender}/>
      <SaveCurrentButton state={state} />
    </FlexCol>
  )
}

export default FileMenu