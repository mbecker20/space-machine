import React, { useState } from 'react'
import CenterMenu from '../../CenterMenu/CenterMenu'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { Button } from '../../all'
import { stringIn } from '../../../helpers/genFuncs'
import { db } from 'rethinkdb'

interface Props {
  saveList: string[]
  onClose: () => void
}

function SaveMenu({ saveList, onClose }: Props) {
  const [saveName, setSaveName] = useState('')
  const baseContainerID = useSelector((state: RootState) => state.baseContainerID)
  const [confirmSaveData, setConfirmSaveData] = useState({ isOpen: false, message: '' })
  const state = useSelector(state => state)
  return (
    <CenterMenu header='save project' 
      onClose={() => {
        
      }}
    >
      <div>
        <input
          value={saveName}
          placeholder={baseContainerID}
          onChange={e => {
            setSaveName(e.target.value)
          }}
        />
        <Button
          onClick={() => {
            if (stringIn(saveName, saveList)) {
              setConfirmSaveData({ isOpen: true, message: 'would you like to overwrite this save?' })
            } else {
              db('spaceDB').table('saves').insert({
                id: saveName,
                savedState: state,
              }).run(window.spaceDBConnection)
              onClose()
            } 
          }}
        >
          save to spaceDB
        </Button>
        {!confirmSaveData.isOpen ? null
        :
        <div></div>
        }
      </div>
    </CenterMenu>
  )
}

export default SaveMenu