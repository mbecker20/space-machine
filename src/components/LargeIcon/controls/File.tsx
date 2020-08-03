import React from 'react'
import useJSS from './style'
import { Button } from '../../all'
import { colors, sizes } from '../../../theme/theme'
import { SetFunc } from '../../../audioModules/moduleTypes'

interface Props {
  controlID: string
  setFunc: SetFunc
  reRenderIcon: () => void
  modName?: string
}

function File({ controlID, setFunc, reRenderIcon, modName }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ControlMenu}>
      <label style={{ minWidth: '50%', }}
        htmlFor={window.highlightedID + controlID}
      >
        <Button style={{
          //backgroundColor: colors.fillModule,
          borderColor: colors.deleteButton,
        }}
        >{modName ? `${modName} - ${controlID}` : controlID}</Button>
      </label>
      <input style={{ width: 0, height: 0, opacity: 0 }}
        type='file'
        id={window.highlightedID + controlID}
        onChange={(e) => {
          const file = ((e.target as HTMLInputElement).files as FileList)[0]
          setFunc(URL.createObjectURL(file))
          window.audioTags[window.highlightedID].srcName = file.name
          window.setTimeout(() => {
            console.log(window.audioModules[window.highlightedID])
          },500)
          window.reRenderAudioTags()
          reRenderIcon()
        }}
      />
      <p style={{
        fontSize: sizes.text.xsmall,
        textAlign: 'center',
        whiteSpace: 'normal',
        justifyContent: 'center',
        width: '100%',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
      }}>
        {window.audioTags[window.highlightedID].srcName}
      </p>
    </div>
  )
}

export default File