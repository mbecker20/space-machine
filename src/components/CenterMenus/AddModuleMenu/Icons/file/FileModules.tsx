import React, { Fragment, useState } from 'react'
import { getDirectorySMMNames } from '../../../../../helpers/fileAccess'
import { sizes } from '../../../../../theme/theme'
import Button from '../../../../Button/Button'
import FileModuleIcon from './FileModuleIcon'

declare global {
  interface Window {
    moduleDirectoryHandle?: any
    fileModuleSaveNames: string[]
    showDirectoryPicker: () => void
  }
}

interface Props {
  totNumModules: number
  row: number
  col: number
  onClose: () => void
}

window.fileModuleSaveNames = []

function FileModules({ totNumModules, row, col, onClose }: Props) {
  const [fileModules, setFileModules] = useState<string[]>(window.fileModuleSaveNames)
  return (
    <Fragment>
      {window.moduleDirectoryHandle ?
      (fileModules.length === 0 ?
      <Fragment>
        <Button fontSize={sizes.text.small} notClickable={true}>
          no modules in this directory.
          save modules by right clicking a custom container,
          and selecting save to file.
        </Button>
        <Button
          onClick={async () => {
            window.moduleDirectoryHandle =  await window.showDirectoryPicker()
            window.fileModuleSaveNames = await getDirectorySMMNames(window.moduleDirectoryHandle)
            setFileModules(window.fileModuleSaveNames)
          }}
        >
          change directory
        </Button>
      </Fragment>
      :
      fileModules.map((name, index) => {
        return (
          <FileModuleIcon key={index} 
            name={name} onClose={onClose}
            totNumModules={totNumModules} 
            row={row} col={col}
          />
        )
      })
      )
      :
      <Button
        onClick={async () => {
          window.moduleDirectoryHandle = await window.showDirectoryPicker()
          window.fileModuleSaveNames = await getDirectorySMMNames(window.moduleDirectoryHandle)
          setFileModules(window.fileModuleSaveNames)
        }}
      >
        select module directory
      </Button>
      }
    </Fragment>
  )
}

export default FileModules