import React from 'react'
import { useDispatch } from 'react-redux'
import restoreAMFromState from '../../../audioModules/restoreAMFromState'
import { loadJSONFromPickedFile } from '../../../helpers/fileAccess'
import { restoreFromState } from '../../../redux/allActions'
import { RootState } from '../../../redux/stateTSTypes'
import { sizes } from '../../../theme/theme'
import Button from '../../Button/Button'

interface Props {
  state: RootState
  reRender: () => void
}

function OpenFileButton({ reRender, state }: Props) {
  const dispatch = useDispatch()
  return (
    <Button fontSize={sizes.text.medium}
      onClick={async () => {
        const newState = await loadJSONFromPickedFile(fileHandle => {
          window.saveFileHandle = fileHandle
        })
        if (newState) {
          restoreAMFromState(state.connections, newState)
          dispatch(restoreFromState(newState))
          reRender()
        } else {
          window.flashNotification('rgba(1, 1, 1, .4)', 'no file selected')
        }
      }}
    >open file</Button>
  )
}

export default OpenFileButton