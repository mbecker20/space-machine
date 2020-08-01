import React, { useState } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'
var ReactRethinkdb = require('react-rethinkdb')
var r = ReactRethinkdb.r

ReactRethinkdb.DefaultSession.connect({
  host: 'localhost',          // hostname of the websocket server
  port: 8015,                 // port number of the websocket server
  path: '/',                  // HTTP path to websocket route
  secure: false,              // set true to use secure TLS websockets
  db: 'test',                 // default database, passed to rethinkdb.connect
  autoReconnectDelayMs: 2000, // when disconnected, millis to wait before reconnect
})

declare global {
  interface Window {
    spaceDBConnection: string
  }
}

export interface Save {
  id: string,
  savedState: RootState,
}


function FileMenu() {
  const [ saveList, setSaveList ] = useState<string[]>([])
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