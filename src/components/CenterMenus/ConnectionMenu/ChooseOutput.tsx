import React from 'react'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { AnyModule } from '../../../redux/stateTSTypes'
import Button from '../../Button/Button'
import IORecursion from './IORecursion'
import useJSS from './style'

interface Props {
  fromMod?: AnyModule
  setActualFromID: (arg: string) => void
  setOutputIndex: (arg: number) => void
}

function ChooseOutput({ fromMod, setActualFromID, setOutputIndex }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.IORecursionBounder}>
      {fromMod?.connectionOutputs.map((outputID, index) => {
        if (fromMod?.moduleType === CONTAINER) {
          return (
            <IORecursion key={outputID + 'output'} id={outputID} isOutput={true}
              setConnection={(actualIOID, ioIndex) => {
                setActualFromID(actualIOID)
                setOutputIndex(ioIndex)
              }}
            />
          )
        } else if (fromMod?.connectionOutputs.length > 1) {
          return (
            <Button
              onClick={() => {
                setOutputIndex(index)
              }}
            >
              {fromMod?.connectionOutputs[index]}
            </Button>
          )
        }
      })}
    </div>
  )
}

export default ChooseOutput