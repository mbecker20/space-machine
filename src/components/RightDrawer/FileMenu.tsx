import React, { useState, useEffect } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { useDispatch } from 'react-redux'
import { restoreFromState as restoreFromStateAction } from '../../redux/allActions'
import { restoreFromState } from '../../redux/restoreFromState'
import { colors } from '../../theme/theme'

declare global {
  interface Window {
    spaceDBSaveService: any
  }
}

export interface Save {
  id: string,
  savedState: RootState,
}

const spaceDB = feathers()
const restClient = rest('http://192.168.1.81:30300') // spaceDB
// http://192.168.1.79:3030 - yoga
// http://192.168.1.65:3030 - mac

spaceDB.configure(restClient.fetch(window.fetch))
window.spaceDBSaveService = spaceDB.service('spaceDB-save-service')

function FileMenu() {
  const [ saveList, setSaveList ] = useState<string[]>([])
  const dispatch = useDispatch()
  useEffect(() => {
    window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) }) 
  }, [])
  return (
    <div>
      <Button onClick={() => { 
        window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) }) 
      }}>
        refresh saves
      </Button>
      <div>
        {saveList.map(saveName => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={saveName}>
              <Button
                onClick={() => {
                  window.spaceDBSaveService.get(saveName).then((savedState: RootState) => {
                    dispatch(restoreFromStateAction(savedState))
                    restoreFromState(savedState)
                  })
                }}
              >
                {saveName}
              </Button>
              <Button style={{ backgroundColor: colors.deleteButton }}
                onClick={() => {
                  window.spaceDBSaveService.remove(saveName)
                  window.setTimeout(() => {
                    window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
                  }, 1000)
                }}
              >
                delete
              </Button>
            </div>
          )
        })}
      </div>
      <Button
        onClick={() => {
          window.openSaveMenu(saveList, () => {
            window.setTimeout(() => {
              window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
            }, 1000)
          })
        }}
      >
        save project
      </Button>
    </div>
  )
}

export default FileMenu