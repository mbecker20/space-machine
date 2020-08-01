import React, { useState } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'

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