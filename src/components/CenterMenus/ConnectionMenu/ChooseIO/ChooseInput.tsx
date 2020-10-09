import React from 'react'
import { CONTAINER } from '../../../../audioModules/moduleTypes'
import { AnyModule } from '../../../../redux/stateTSTypes'
import Button from '../../../Button/Button'
import IORecursion from './IORecursion'
import useJSS from '.././style'

interface Props {
  toMod?: AnyModule
  setActualToID: (arg: string) => void
  setInputIndex: (arg: number) => void
}

function ChooseInput({ toMod, setActualToID, setInputIndex }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.IORecursionBounder}>
      {toMod?.connectionInputs.map((inputID, index) => {
        if (toMod?.moduleType === CONTAINER) {
          return (
            <IORecursion key={inputID + 'input'} id={inputID} isOutput={false}
              setConnection={(actualIOID, ioIndex) => {
                setActualToID(actualIOID)
                setInputIndex(ioIndex)
              }}
            />
          )
        } else if (toMod?.connectionInputs.length > 1) {
          return (
            <Button
              onClick={() => {
                setInputIndex(index)
              }}
            >
              {toMod?.connectionOutputs[index]}
            </Button>
          )
        }
      })}
    </div>
  )
}

export default ChooseInput