import React, { useState, useRef } from 'react'
import CenterMenu from '../CenterMenu/CenterMenu'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { stringIn } from '../../../helpers/genFuncs'
import { sizes, colors } from '../../../theme/theme'
import useJSS from './style'
import FlexRow from '../../Flex/FlexRow'
import Button from '../../Button/Button'
import FlexCol from '../../Flex/FlexCol'

interface Props {
  saveList: string[]
  onClose: () => void
}

function SpaceDBProjectSaveMenu({ saveList, onClose }: Props) {
  const state = useSelector((state: RootState) => state)
  const { baseContainerID, modules } = state
  const [saveName, setSaveName] = useState(modules[baseContainerID].name)
  const [confirmSaveData, setConfirmSaveData] = useState({ isOpen: false, message: '' })
  const inputRef = useRef<HTMLInputElement>(null)
  const classes = useJSS()
  return (
    <CenterMenu header='save project' 
      onClose={onClose}
    >
      <FlexRow style={{ alignItems: 'center' }}>
        <input className={classes.CenterMenuInput}
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
                  }).then((res: any) => {
                    if (res) {
                      window.flashNotification('green', 'project saved')
                    }
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
              setConfirmSaveData({ isOpen: true, message: 'save already exists. do you want to replace it?' })
            } else {
              window.projectSaveService.create({
                saveName,
                state
              }).then((res: any) => {
                if (res) {
                  window.flashNotification('green', 'project saved')
                }
              })
              onClose()
            } 
          }}
        >
          save to spaceDB
        </Button>
      </FlexRow>
      {!confirmSaveData.isOpen ? null
        :
        <FlexCol>
          <div
            style={{ fontSize: sizes.text.small }}
          >
            { confirmSaveData.message }
          </div>
          <FlexRow style={{ justifyContent: 'center' }}>
            <Button style={{ backgroundColor: colors.denyButton, marginRight: '3vmin' }}
              onClick={() => {
                inputRef.current?.focus()
                setConfirmSaveData({ isOpen: false, message: '' })
              }}
            >no</Button>
            <Button style={{ backgroundColor: colors.confirmButton }}
              onClick={() => {
                window.projectSaveService.update(saveName, state).then((res: any) => {
                  if (res) {
                    window.flashNotification('green', 'project updated')
                  }
                })
                onClose()
              }}
            >yes</Button>
          </FlexRow>
        </FlexCol>
      }
    </CenterMenu>
  )
}

export default SpaceDBProjectSaveMenu