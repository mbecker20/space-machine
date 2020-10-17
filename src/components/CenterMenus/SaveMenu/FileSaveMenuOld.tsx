import React, { useRef, useState, useEffect } from 'react'
import settingsSVG from '../../../icons/settings.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { sizes } from '../../../theme/theme'
import { getFileDirectory } from './helpers'
import useJSS from './style'
import CenterMenu from '../CenterMenu/CenterMenu'
import Button from '../../Button/Button'
import FlexCol from '../../Flex/FlexCol'

declare global {
  interface Window {
    openFileSaveMenu: () => void
    currentSaveDirectory: string
  }
}

window.currentSaveDirectory = ''

function FileSaveMenu() {
  const [isOpen, setOpen] = useState(false)
  window.openFileSaveMenu = () => { setOpen(true) }
  const onClose = () => { setOpen(false) }
  const folderRef = useRef<HTMLInputElement>(null)
  const state = useSelector((state: RootState) => state)
  const initName = state.modules[state.baseContainerID].name
  const [saveName, setSaveName] = useState(initName)
  const [currentDirectory, setCurrentDirectory] = useState(window.currentSaveDirectory)
  const classes = useJSS()
  useEffect(() => {
    window.setTimeout(() => {
      if (folderRef.current) {
        (folderRef.current as any).webkitdirectory = true
      }
    }, 50)
  }, [])
  return (
    <CenterMenu header='save project as file'
      isClosed={!isOpen}
      onClose={onClose}
    >
      <FlexCol alignItems='center'>
        {
          window.currentSaveDirectory.length === 0 ?
          <label htmlFor='chooseDirectory' style={{ marginBottom: '1vmin', fontSize: sizes.text.small }}>
            <Button
              onClick={() => {

              }}
            >choose save directory</Button>
          </label>
          :
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2vmin' }}>
            <div style={{ fontSize: sizes.text.small }}>
              {currentDirectory}
            </div>
            <label
              style={{ 
                backgroundColor: 'blue', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginLeft: '2vmin',
                borderRadius: '1vmin',
              }}
              htmlFor='chooseDirectory'
            >
              <img
                style={{ width: '.7em', padding: '.2vmin' }}
                title='edit directory'
                src={settingsSVG}
                alt='edit directory'
              >
              </img>
            </label>
          </div>
        }
        <input style={{ width: 0, height: 0, opacity: 0 }}
          id='chooseDirectory'
          type='file'
          ref={folderRef}
          onChange={e => {
            if (((e.target as HTMLInputElement).files as FileList)[0]) {
              const goodDir = getFileDirectory((((e.target as HTMLInputElement).files as FileList)[0] as any).path)
              window.currentSaveDirectory = goodDir
              setCurrentDirectory(goodDir)
            }
          }}
        />
        <input className={classes.CenterMenuInput}
          value={saveName}
          onChange={e => {
            setSaveName(e.target.value)
          }}
          onKeyDown={e => {
            switch (e.key) {
              case 'Enter':
                if (saveName !== '') {
                  /* fs.writeFile(currentDirectory + saveName + '.sm', JSON.stringify(state), (err: any) => {
                    //console.log(`saved to ${currentDirectory + saveName + '.sm'}`)
                    if (err) throw err
                    window.flashNotification('green', 'file saved')
                  }) */
                  onClose()
                } else {
                  alert('please enter a save name')
                }
                break
              case 'Escape': //escape
                onClose()
                break
            }
          }}
        />
        <Button
          onClick={() => {
            if (saveName !== '' && currentDirectory !== '') {
              /* fs.writeFile(currentDirectory + saveName + '.sm', JSON.stringify(state), (err: any) => {
                //console.log(`saved to ${currentDirectory + saveName + '.sm'}`)
                if (err) throw err
                window.flashNotification('green', 'file saved')
              }) */
              onClose()
            } else {
              window.flashNotification('red', 'please enter save name or set directory')
            }
          }}
        >save</Button>
      </FlexCol>
    </CenterMenu>
  )
}

export default FileSaveMenu