import React, { useRef, useState } from 'react'
import { Button, CenterMenu } from '../../all'
import settingsSVG from '../../../icons/settings.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { sizes } from '../../../theme/theme'

declare global {
  interface Window {
    currentSaveDirectory: string
  }
}

window.currentSaveDirectory = ''

interface Props {
  onClose: () => void
}

function FileSaveMenu({ onClose }: Props) {
  const folderRef = useRef<HTMLInputElement>(null)
  const initName = useSelector((state: RootState) => state.modules[state.baseContainerID].name)
  const [saveName, setSaveName] = useState(initName)
  return (
    <CenterMenu header='save project as file'
      onClose={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          window.currentSaveDirectory.length === 0 ?
          <label htmlFor='chooseDirectory'>
            <Button
              onClick={() => {

              }}
            >choose save directory</Button>
          </label>
          :
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{ fontSize: sizes.text.small }}>
              {window.currentSaveDirectory}
            </div>
            <label htmlFor='chooseDirectory'>
              <img
                title='edit directory'
                src={settingsSVG}
                alt='edit directory'
                onClick={() => {

                }}
              >
              </img>
            </label>
          </div>
        }
        <input style={{ width: 0, height: 0, opacity: 0 }}
          id='chooseDirectory'
          type='file'
          ref={folderRef}
        />
        <input style={{ fontSize: sizes.text.small }}
          value={saveName}
          onChange={e => {
            setSaveName(e.target.value)
          }}  
        />
      </div>
    </CenterMenu>
  )
}

export default FileSaveMenu