import React, { Fragment } from 'react'
import { getTrimmedSMFileName, saveJSONToFileHandle } from '../../../helpers/fileAccess'
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
        <Button fontSize={sizes.text.medium} 
          notClickable={true}
          style={{
            backgroundColor: 'transparent',
            color: colors.disabled,
          }}
        > no file open </Button>
      :
        <Button fontSize={sizes.text.medium}
          onClick={async () => {
            await saveJSONToFileHandle(window.saveFileHandle, state)
            window.flashNotification(colors.success, `${getTrimmedSMFileName(window.saveFileHandle)} saved`)
          }}
        >{`save ${getTrimmedSMFileName(window.saveFileHandle)}`}</Button>
      }
    </Fragment>
  )
}

export default SaveCurrentButton