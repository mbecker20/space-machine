import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { restoreFromState } from '../../redux/allActions'
import restoreAMFromState from '../../audioModules/restoreAMFromState'
import Button from '../Button/Button'
import FlexCol from '../Flex/FlexCol'
import { getTrimmedFileName, loadJSONFromPickedFile, saveJSONToFileHandle } from '../../helpers/fileAccess'
import { colors, sizes } from '../../theme/theme'

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
  const folderRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const [, toReRender] = useState({})
  useEffect(() => {
    window.setTimeout(() => {
      if (folderRef.current) {
        (folderRef.current as any).webkitdirectory = true
      }
    }, 50)
  }, [])
  return (
    <FlexCol alignItems='center'>
      <Button fontSize={sizes.text.medium}
        onClick={async () => {
          const newState = await loadJSONFromPickedFile(fileHandle => {
            window.saveFileHandle = fileHandle
          })
          if (newState) {
            restoreAMFromState(state.connections, newState)
            dispatch(restoreFromState(newState))
            toReRender({})
          } else {
            window.flashNotification('rgba(1, 1, 1, .4)', 'no file selected')
          }
        }}
      >open file</Button>
      <Button fontSize={sizes.text.medium}
        onClick={async () => {
          window.saveFileHandle = await window.showSaveFilePicker({
            types: [
              {
                description: 'space machine projects',
                accept: {
                  'text/plain': '.sm',
                },
                excludeAcceptAllOption: true
              }
            ]
          })
          if (!window.saveFileHandle) {
            window.flashNotification('rgba(1, 1, 1, .4)', 'no file selected')
          } else {
            saveJSONToFileHandle(window.saveFileHandle, state)
            toReRender({})
            window.flashNotification(colors.success, `${getTrimmedFileName(window.saveFileHandle)} saved`)
          }
        }}
      >save as new project</Button>
      {!window.saveFileHandle ? null :
      <Button fontSize={sizes.text.medium}
        onClick={async () => {
          await saveJSONToFileHandle(window.saveFileHandle, state)
          window.flashNotification(colors.success, `${getTrimmedFileName(window.saveFileHandle)} saved`)
        }}
      >{`save ${getTrimmedFileName(window.saveFileHandle)}`}</Button>
      }
    </FlexCol>
  )
}

export default FileMenu