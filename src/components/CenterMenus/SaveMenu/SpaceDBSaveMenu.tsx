import React, { useState, useRef } from 'react'
import CenterMenu from '../../CenterMenu/CenterMenu'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { Button } from '../../all'
import { stringIn } from '../../../helpers/genFuncs'
import { sizes, colors } from '../../../theme/theme'

interface Props {
  saveList: string[]
  onClose: () => void
}

function SpaceDBSaveMenu({ saveList, onClose }: Props) {
  const [ baseContainerID, modules ] = useSelector((state: RootState) => [ state.baseContainerID, state.modules ])
  const [saveName, setSaveName] = useState(modules[baseContainerID].name)
  const [confirmSaveData, setConfirmSaveData] = useState({ isOpen: false, message: '' })
  const state = useSelector(state => state)
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <CenterMenu header='save project' 
      onClose={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <input style={{ fontSize: sizes.text.small }}
          value={saveName}
          placeholder={modules[baseContainerID].name}
          onChange={e => {
            setSaveName(e.target.value)
          }}
          onKeyDown={e => {
            switch (e.keyCode) {
              case 13:
                if (stringIn(saveName, saveList)) {
                  setConfirmSaveData({ isOpen: true, message: 'would you like to overwrite this save?' })
                } else {
                  window.projectSaveService.create({
                    saveName,
                    state
                  })
                  onClose()
                }
                break
              case 27:
                onClose()
                break
            }
          }}
          ref={inputRef}
          autoFocus
        />
        <Button
          onPointerDown={e => e.preventDefault()}
          onClick={e => {
            e.preventDefault()
            if (stringIn(saveName, saveList)) {
              setConfirmSaveData({ isOpen: true, message: 'would you like to overwrite this save?' })
            } else {
              window.projectSaveService.create({
                saveName,
                state
              })
              onClose()
            } 
          }}
        >
          save to spaceDB
        </Button>
      </div>
      {!confirmSaveData.isOpen ? null
        :
        <div>
          <div>save already exists. do you want to replace it?</div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: colors.denyButton, marginRight: '3vmin' }}
              onClick={() => {
                inputRef.current?.focus()
                setConfirmSaveData({ isOpen: false, message: '' })
              }}
            >no</Button>
            <Button style={{ backgroundColor: colors.confirmButton }}
              onClick={() => {
                window.projectSaveService.update(saveName, state)
                onClose()
              }}
            >yes</Button>
          </div>
        </div>
      }
    </CenterMenu>
  )
}

export default SpaceDBSaveMenu