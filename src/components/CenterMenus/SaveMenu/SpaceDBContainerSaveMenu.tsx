import React, { useState, useRef } from 'react'
import CenterMenu from '../../CenterMenu/CenterMenu'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { Button } from '../../all'
import { stringIn } from '../../../helpers/genFuncs'
import { getContainerModulesConnections } from '../../../redux/getContainerAsProject'

interface Props {
  id: string
  saveList: string[]
  onClose: () => void
}

function confirmSaveName(setConfirmSaveData: (arg: any) => void, containerID: string, name: string, saveList: string[], state: RootState, onClose: () => void) {
  if (!stringIn(name, saveList)) {
    const { modules, connections } = getContainerModulesConnections(state, containerID)
    window.containerSaveService.create({
      name,
      containerID,
      modules,
      connections,
    })
    onClose()
    window.flashNotification('green', 'module saved to spaceDB')
  } else {
    setConfirmSaveData({ isOpen: true, message: 'module with this name already exists. would you like to overwrite it?' })
  }
}

function SpaceDBContainerSaveMenu({ id, saveList, onClose }: Props) {
  const state = useSelector((state: RootState) => state)
  const initName = state.modules[id].name
  const [name, setName] = useState(initName)
  const [confirmSaveData, setConfirmSaveData] = useState({ isOpen: false, message: '' })
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <CenterMenu header='save container module' 
      onClose={onClose}
    >
      <input 
        value={name}
        placeholder={initName}
        ref={inputRef}
        onChange={e => {
          setName(e.target.value)
        }}
        onKeyDown={e => {
          switch (e.keyCode) {
            case 13: // enter
              confirmSaveName(setConfirmSaveData, id, name, saveList, state, onClose)
              break
            case 27: // escape
              onClose()
              break
          }
        }}
        autoFocus
      />
      <Button
        onClick={() => {
          confirmSaveName(setConfirmSaveData, id, name, saveList, state, onClose)
        }}
      >confirm</Button>
      {
        !confirmSaveData.isOpen ? null :
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = ''
                inputRef.current.focus()
              }
              setConfirmSaveData({ isOpen: false, message: '' })
            }}
          >no</Button>
          <Button
            onClick={() => {
              const { modules, connections } = getContainerModulesConnections(state, id)
              window.containerSaveService.create({
                name,
                containerID: id,
                modules,
                connections,
              })
              window.flashNotification('green', 'module saved to spaceDB')
              onClose()
            }}
          >yes</Button>
        </div>
      }
    </CenterMenu>
  )
}

export default SpaceDBContainerSaveMenu