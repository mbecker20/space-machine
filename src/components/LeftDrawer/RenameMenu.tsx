import React, { useRef, useState } from 'react'
import { CenterMenu } from '../all'
import useJSS from './style'
import { stringIn } from '../../helpers/genFuncs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { renameContainer } from '../../redux/allActions'


interface Props {
  setRMOpen: (bool: boolean) => void
  setTopText: (str: string) => void
}

function RenameMenu({ setRMOpen, setTopText }: Props) {
  const classes = useJSS()
  const renameInputRef = useRef<HTMLInputElement>(null)
  const existingIDs = useSelector((state: RootState) => Object.keys(state.containerModules))
  const dispatch = useDispatch()
  const [submitState, setSubmitState] = useState({
    
  })
  function submitNewName() {
    if (renameInputRef && renameInputRef.current) {
      if (renameInputRef.current.value.length === 0) {

      } else if (stringIn(renameInputRef.current.value, existingIDs)) {

      } else {
        dispatch(renameContainer(window.highlightedID, renameInputRef.current.value))
        setRMOpen(false)
        window.highlightedID = renameInputRef.current.value
        setTopText(renameInputRef.current.value)
      }
    }
  }
  return (
    <CenterMenu header='rename' onClose={() => setRMOpen(false)}>
        <div className={classes.CMInputBounder}>
          <input className={classes.CenterMenuInput}
            placeholder={window.highlightedID}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                submitNewName()
              }
            }}
            ref={renameInputRef}
            autoFocus
          />
          <div className={classes.InputSubmit}
            onClick={() => {submitNewName()}}
          >enter</div>
        </div>
      </CenterMenu>
  )
}

export default RenameMenu