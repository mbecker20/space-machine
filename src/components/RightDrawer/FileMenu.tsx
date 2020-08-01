import React, { useState } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { useDispatch } from 'react-redux'
import { restoreFromState as restoreFromStateAction } from '../../redux/allActions'
import { restoreFromState } from '../../redux/restoreFromState'

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
const restClient = rest('http://192.168.1.65:3030')
spaceDB.configure(restClient.fetch(window.fetch))
window.spaceDBSaveService = spaceDB.service('spaceDB-save-service')

function FileMenu() {
  const [ saveList, setSaveList ] = useState<string[]>([])
  const dispatch = useDispatch()
  return (
    <div>
      <Button 
        onClick={() => {
          window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
        }}
      >refresh saves</Button>
      <div>
        {saveList.map(saveName => {
          return (
            <Button key={saveName}
              onClick={() => {
                window.spaceDBSaveService.get(saveName).then((savedState: RootState) => {
                  dispatch(restoreFromStateAction(savedState))
                  restoreFromState(savedState)
                })
              }}
            >
              {saveName}
            </Button>
          )
        })}
      </div>
      <Button
        onClick={() => {
          window.openSaveMenu(saveList)
        }}
      >
        save project
      </Button>
    </div>
  )
}

export default FileMenu