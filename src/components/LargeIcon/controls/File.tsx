import React from 'react'
import useJSS from './style'
import { sizes } from '../../../theme/theme'
import { SetFunc } from '../../../audioModules/moduleTypes'
import Button from '../../Button/Button'

interface Props {
  actualModID: string
  controlID: string
  setFunc: SetFunc
  reRenderIcon: () => void
  modName?: string
  label?: string
}

function File({ actualModID, controlID, setFunc, reRenderIcon, modName, label }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ControlMenu}>
      <label style={{ minWidth: '50%', }}
        htmlFor={actualModID + controlID}
      >
        <Button fontSize={sizes.text.small}>
          {label ? label : modName ? `${modName} - ${controlID}` : controlID}
        </Button>
      </label>
      <input style={{ width: 0, height: 0, opacity: 0 }}
        type='file'
        id={actualModID + controlID}
        onChange={(e) => {
          const file = ((e.target as HTMLInputElement).files as FileList)[0]
          setFunc(URL.createObjectURL(file))
          window.audioTags[actualModID].srcName = file.name
          window.reRenderAudioTags()
          reRenderIcon()
        }}
      />
      <div className={classes.SrcName}>
        {window.audioTags[actualModID].srcName}
      </div>
    </div>
  )
}

export default File