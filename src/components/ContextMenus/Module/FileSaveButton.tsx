import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { RootState } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import Conditional from '../../Conditional/Conditional'

interface Props {
  modID: string
}

function FileSaveButton({ modID }: Props) {
  const modules = useSelector((state: RootState) => state.modules)
  return (
    <Conditional showIf={modules[modID].moduleType === CONTAINER}>
      <Button
        onClick={() => {
          
        }}
      >
        save to file
      </Button>
    </Conditional>
  )
}

export default FileSaveButton