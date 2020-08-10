import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { Button } from '../all'
import { restoreFromState } from '../../redux/allActions'
import restoreAMFromState from '../../audioModules/restoreAMFromState'
let fs: any
if (window.usingElectron) {
  fs = window.require('fs')
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
      <label htmlFor='chooseFile'>
        <Button
        >open file</Button>
      </label>
      <input style={{ width: 0, height: 0, opacity: 0 }}
        id='chooseFile'
        type='file'
        onChange={e => {
          const file = ((e.target as HTMLInputElement).files as FileList)[0]
          if (file) {
            const path = (file as any).path
            fs.readFile(path, (err: any, data: string) => {
              if (err) throw err;
              const newState = JSON.parse(data)
              restoreAMFromState(state.connections, newState)
              dispatch(restoreFromState(newState))
            })
          }
        }}
      />
      <Button
        onClick={() => {
          window.openFileSaveMenu()
        }}
      >save</Button>
    </div>
  )
}

export default FileMenu