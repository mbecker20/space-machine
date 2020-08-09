import React, { useState, useEffect } from 'react'
import { Button } from '../all'
import { RootState } from '../../redux/stateTSTypes'
import { useDispatch, useSelector } from 'react-redux'
import { restoreFromState } from '../../redux/allActions'
import restoreAMFromState from '../../audioModules/restoreAMFromState'
import { colors } from '../../theme/theme'

export interface Save {
  id: string,
  savedState: RootState,
}

const buttonStyle = {
  backgroundColor: 'transparent'
}

function SpaceDBMenu() {
  const [ saveList, setSaveList ] = useState<string[]>([])
  const dispatch = useDispatch()
  const connections = useSelector((state: RootState) => state.connections)
  useEffect(() => {
    window.projectSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) }) 
  }, [])
  return (
    <div>
      <Button style={buttonStyle}
        onClick={() => {
          window.projectSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) }) 
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
                  window.projectSaveService.get(saveName).then((savedState: RootState) => {
                    restoreAMFromState(connections, savedState)
                    dispatch(restoreFromState(savedState))
                  })
                }}
              >
                {saveName}
              </Button>
              <Button style={{ backgroundColor: colors.deleteButton }}
                onClick={() => {
                  window.openConfirmDeleteMenu(saveName, () => {
                    window.setTimeout(() => {
                      window.projectSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
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
          window.openSpaceDBSaveMenu(saveList, () => {
            window.setTimeout(() => {
              window.projectSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
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