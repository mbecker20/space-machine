import React, { Fragment } from 'react'
import { getTrimmedFileName, saveJSONToFileHandle } from '../../../helpers/fileAccess'
import { RootState } from '../../../redux/stateTSTypes'
import { colors, sizes } from '../../../theme/theme'
import Button from '../../Button/Button'

interface Props {
  state: RootState
}

function SaveCurrentButton({ state }: Props) {
  return (
    <Fragment>
      {!window.saveFileHandle ? 
        <div>no file chosen</div>
      :
        <Button fontSize={sizes.text.medium}
          onClick={async () => {
            await saveJSONToFileHandle(window.saveFileHandle, state)
            window.flashNotification(colors.success, `${getTrimmedFileName(window.saveFileHandle)} saved`)
          }}
        >{`save ${getTrimmedFileName(window.saveFileHandle)}`}</Button>
      }
    </Fragment>
  )
}

export default SaveCurrentButton