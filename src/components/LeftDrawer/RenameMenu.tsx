import React, { useRef, useState } from 'react'
import { CenterMenu } from '../all'
import useJSS from './style'
import { stringIn } from '../../helpers/genFuncs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { renameContainer, changeBase } from '../../redux/allActions'


interface Props {
  setRMOpen: (bool: boolean) => void
  setTopText: (str: string) => void
}

function createSubmitState(isTooShort = false, isAlreadyTaken = false) { // default is deactivated
  return { isTooShort, isAlreadyTaken }
}

function RenameMenu({ setRMOpen, setTopText }: Props) {
  const classes = useJSS()
  const renameInputRef = useRef<HTMLInputElement>(null)
  const { existingIDs, baseContainerID } = useSelector((state: RootState) => {
    return {
      existingIDs: Object.keys(state.containerModules),
      baseContainerID: state.baseContainerID
    }
  })
  const dispatch = useDispatch()
  const [ {isTooShort, isAlreadyTaken }, setSubmitState] = useState(createSubmitState())
  function submitNewName() {
    if (renameInputRef && renameInputRef.current) {
      const newName = renameInputRef.current.value
      if (newName.length === 0) {
        setSubmitState(createSubmitState(true, false))
      } else if (stringIn(newName, existingIDs)) {
        setSubmitState(createSubmitState(false, true))
      } else {
        dispatch(renameContainer(window.highlightedID, newName))
        if (window.highlightedID === baseContainerID) {
          dispatch(changeBase(newName))
        }
        if (window.highlightedID === window.fillContainerID) {
          window.fillContainerID = newName
        }
        window.highlightedID = newName
        setTopText(newName)
        setSubmitState(createSubmitState())
        setRMOpen(false)
      }
    }
  }
  return (
    <CenterMenu header='rename' onClose={() => {setRMOpen(false)}}>
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
        {!isTooShort ? null :
        <div className={classes.Error}>
          please enter a name
        </div>}
        {!isAlreadyTaken ? null :
        <div className={classes.Error}>
          name already taken
        </div>}
      </CenterMenu>
  )
}

export default RenameMenu