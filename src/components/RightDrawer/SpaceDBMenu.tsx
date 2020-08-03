import React, { useState, useEffect } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { useDispatch, useSelector } from 'react-redux'
import { restoreFromState } from '../../redux/allActions'
import restoreAMFromState from '../../audioModules/restoreAMFromState'
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

const buttonStyle = {
  backgroundColor: 'transparent'
}

function SpaceDBMenu() {
  const [ saveList, setSaveList ] = useState<string[]>([])
  const dispatch = useDispatch()
  const connections = useSelector((state: RootState) => state.connections)
  useEffect(() => {
    window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) }) 
  }, [])
  return (
    <div>
      <Button style={buttonStyle}
        onClick={() => {
          window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) }) 
        }}
      >
        refresh saves
      </Button>
      <div>
        {saveList.map(saveName => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={saveName}>
              <Button style={buttonStyle}
                onClick={() => {
                  window.spaceDBSaveService.get(saveName).then((savedState: RootState) => {
                    dispatch(restoreFromState(savedState))
                    restoreAMFromState(connections, savedState)
                  })
                }}
              >
                {saveName}
              </Button>
              <Button style={{ backgroundColor: colors.deleteButton }}
                onClick={() => {
                  window.openConfirmDeleteMenu(saveName, () => {
                    window.setTimeout(() => {
                      window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
                    }, 1000)
                  })
                }}
              >
                delete
              </Button>
            </div>
          )
        })}
      </div>
      <Button style={buttonStyle}
        onClick={() => {
          window.openSaveMenu(saveList, () => {
            window.setTimeout(() => {
              window.spaceDBSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
            }, 1000)
          })
        }}
      >
        save
      </Button>
    </div>
  )
}

export default SpaceDBMenu