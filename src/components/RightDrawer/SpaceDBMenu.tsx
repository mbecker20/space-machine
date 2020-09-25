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
      <Button style={{ backgroundColor: colors.sdbSaveButton }}
        onClick={() => {
          window.openSpaceDBProjectSaveMenu(saveList, () => {
            window.setTimeout(() => {
              window.projectSaveService.find().then((saveNames: string[]) => { setSaveList(saveNames) })
            }, 1000)
          })
        }}
      >
        save project
      </Button>
      <div>
        {saveList.map((saveName, index) => {
          return (
            <Button style={buttonStyle}
              key={index}
              onClick={() => {
                window.projectSaveService.get(saveName).then((savedState: RootState) => {
                  restoreAMFromState(connections, savedState)
                  dispatch(restoreFromState(savedState))
                })
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                e.persist()
                window.openSDBProjectContextMenu(e, saveName, setSaveList)
              }}
            >
              {saveName}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default SpaceDBMenu