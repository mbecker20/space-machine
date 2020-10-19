import React from 'react'
import { getTrimmedFileName, saveJSONToFileHandle } from '../../../helpers/fileAccess'
import { RootState } from '../../../redux/stateTSTypes'
import { colors, sizes } from '../../../theme/theme'
import Button from '../../Button/Button'

interface Props {
  state: RootState
  reRender: () => void
}

function SaveAsNewButton({ state, reRender }: Props) {
  return (
    <Button fontSize={sizes.text.medium}
      onClick={async () => {
        window.saveFileHandle = await window.showSaveFilePicker({
          types: [
            {
              description: 'space machine project',
              accept: {
                'example/*': ['.sm'],
              },
            }
          ]
        })
        if (!window.saveFileHandle) {
          window.flashNotification('rgba(1, 1, 1, .4)', 'no file selected')
        } else {
          saveJSONToFileHandle(window.saveFileHandle, state)
          reRender()
          window.flashNotification(colors.success, `${getTrimmedFileName(window.saveFileHandle)} saved`)
        }
      }}
    >save as new project</Button>
  )
}

export default SaveAsNewButton