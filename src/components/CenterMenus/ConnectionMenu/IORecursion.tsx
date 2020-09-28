import React, { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import Button from '../../Button/Button'
import useJSS from './style'
import { colors } from '../../../theme/theme'

interface Props {
  id: string
  isOutput: boolean
  setConnection: (actualIOID: string, ioIndex: number) => void 
}

function IORecursion({ id, isOutput, setConnection }: Props) {
  const { isContainer, name, io } = useSelector((state: RootState) => {
    return {
      isContainer: state.modules[id].moduleType === CONTAINER,
      name: state.modules[id].name,
      io: isOutput ? state.modules[id].connectionOutputs : state.modules[id].connectionInputs
    }
  })
  const [open, setOpen] = useState(false)
  const classes = useJSS()
  if (isContainer) {
    return (
      <Fragment>
        <Button style={{ color: colors.expandableName }}
          onClick={() => { setOpen(!open) }}
        >{name}</Button>
        {!open ? null
        :
        <div className={classes.IORecursionInnerBounder}>
          {io.map(ioID => {
            return (
              <IORecursion key={ioID} id={ioID} isOutput={isOutput} setConnection={setConnection}/>
            )
          })}
        </div>
        }
      </Fragment>
    )
  } else { // base case
    if (io.length > 1) {
      return (
        <Fragment>
          <Button style={{ color: colors.expandableName }}
            onClick={() => { setOpen(!open) }}
          >{name}</Button>
          {!open ? null
          :
          <div className={classes.IORecursionInnerBounder}>
            {io.map((ioID, index) => {
              return (
                <Button style={{ color: colors.connectableName }}
                  onClick={() => { setConnection(id, index) }}
                >{ioID}</Button>
              )
            })}
          </div>
          }
        </Fragment>
      )
    } else {
      return (
        <Button
          onClick={() => { setConnection(id, 0) }}
        >{name}</Button>
      )
    }
  }
}

export default IORecursion