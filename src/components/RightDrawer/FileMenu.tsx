import React, { useState } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'

/* declare global {
  interface Window {
    spaceDBConnection: Application
  }
} */

export interface Save {
  id: string,
  savedState: RootState,
}

const spaceDB = feathers()
const restClient = rest('http://localhost:3030')

function FileMenu() {
  const [ saveList,  ] = useState<string[]>([])
  if (window.spaceDBConnection) {
    
  }
  return (
    <div>
      <div>
        {saveList.map(saveName => {
          return (
            <div key={saveName}>
              {saveName}
            </div>
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