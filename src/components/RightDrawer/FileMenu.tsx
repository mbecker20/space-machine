import React, { useState } from 'react'
import { connect, db, Connection } from 'rethinkdb'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'

declare global {
  interface Window {
    spaceDBConnection: Connection
  }
}

export interface Save {
  id: string,
  savedState: RootState,
}

connect({ host: 'localhost', port: 28015 }, (err, connection) => {
  if (err) throw err
  window.spaceDBConnection = connection
})


function FileMenu() {
  const [ saveList, setSaveList ] = useState<string[]>([])
  if (window.spaceDBConnection) {
    db('spaceDB').table('saves').map(save => save('id')).run(window.spaceDBConnection, (err, realSaveList) => {
      if (err) throw err
      realSaveList.toArray().then(sl => { setSaveList(sl) })
    })
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