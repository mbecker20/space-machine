import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { Button } from '../all'
import { getFileDirectory } from './helpers'
import { sizes } from '../../theme/theme'
import { restoreFromState } from '../../redux/allActions'
import restoreAMFromState from '../../audioModules/restoreAMFromState'
const fs = window.require('fs')

interface Props {
  initName: string
}

function FileMenu({ initName }: Props) {
  const state = useSelector((state: RootState) => state)
  const folderRef = useRef<HTMLInputElement>(null)
  const [saveName, setSaveName] = useState(initName)
  const dispatch = useDispatch()
  useEffect(() => {
    window.setTimeout(() => {
      if (folderRef.current) {
        (folderRef.current as any).webkitdirectory = true
      }
    }, 50)
  }, [])
  return (
    <div>
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
              restoreAMFromState(state.connections , newState)
              dispatch(restoreFromState(newState))
            })
          }
        }}
      />
      <input style={{ fontSize: sizes.text.small }}
        placeholder={initName}
        value={saveName}
        onChange={e => {
          setSaveName(e.target.value)
        }}
      />
      <label htmlFor='chooseFolder'>
        <Button>save (select folder)</Button>
      </label>
      <input style={{ width: 0, height: 0, opacity: 0 }}
        id='chooseFolder'
        type='file'
        ref={folderRef}
        onChange={e => {
          const goodDir = getFileDirectory((((e.target as HTMLInputElement).files as FileList)[0] as any).path)
          if (saveName !== '') {
            console.log(goodDir + saveName + '.sm')
            fs.writeFile(goodDir + saveName + '.sm', JSON.stringify(state), (err: any) => {
              console.log('saved maybe')
              if (err) throw err
            })
          }
        }}
      />
    </div>
  )
}

export default FileMenu