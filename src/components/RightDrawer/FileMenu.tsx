import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { restoreFromState } from '../../redux/allActions'
import restoreAMFromState from '../../audioModules/restoreAMFromState'
import Button from '../Button/Button'

declare global {
  interface Window {
    showOpenFilePicker: any
    saveDirectoryHandle?: any
  }
}

function FileMenu() {
  const state = useSelector((state: RootState) => state)
  const folderRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  
  useEffect(() => {
    window.setTimeout(() => {
      if (folderRef.current) {
        (folderRef.current as any).webkitdirectory = true
      }
    }, 50)
  }, [])
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Button
        onClick={async () => {
          window.saveDirectoryHandle = await window.showDirectoryPicker()
          for await (const entry of window.saveDirectoryHandle.values()) {
            console.log(entry)
          }
        }}
      >choose directory</Button>
      <Button
        onClick={async () => {
          const [ fileHandle ] = await window.showOpenFilePicker()
          const file = await fileHandle.getFile()
          const data = await file.text()
          const newState = JSON.parse(data)
          restoreAMFromState(state.connections, newState)
          dispatch(restoreFromState(newState))
        }}
      >open file</Button>
      <Button
        onClick={() => {
          window.openFileSaveMenu()
        }}
      >save</Button>
    </div>
  )
}

export default FileMenu