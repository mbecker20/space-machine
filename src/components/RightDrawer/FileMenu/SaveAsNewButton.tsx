import React from 'react'
import { getTrimmedFileName, saveJSONToChosenFile } from '../../../helpers/fileAccess'
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
        saveJSONToChosenFile(state, () => {
          reRender()
          window.flashNotification(colors.success, `${getTrimmedFileName(window.saveFileHandle)} saved`)
        })
      }}
    >save as</Button>
  )
}

export default SaveAsNewButton