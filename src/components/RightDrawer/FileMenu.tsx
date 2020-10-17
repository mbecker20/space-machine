import React, { useRef, useEffect, useState } from 'react'
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
  const [ saveList, setSaveList ] = useState<string[]>([])
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
          let sn: string[] = []
          for await (const entry of window.saveDirectoryHandle.values()) {
            const name: string = entry.name
            if (name.slice(name.length - 3) === '.sm') {
              sn.push(name.slice(0, name.length - 3))
            }
          }
          setSaveList(sn)
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
      {saveList.map(saveName => {
        return (
          <Button key={saveName}
            onClick={() => {

            }}
          >
            {saveName}
          </Button>
        )
      })}
    </div>
  )
}

export default FileMenu