import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'

function BlankProjectButton() {
  const numMods = useSelector((state: RootState) => Object.keys(state.modules).length)
  return (
    <Fragment>
      {numMods < 2 ? null :
        <Button
          onClick={() => {
            window.openConfirmBlankProjectMenu()
          }}
        >blank project</Button>
      }
    </Fragment>
  )
}

export default BlankProjectButton