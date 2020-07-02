import React, { useRef, useState } from 'react'
import { CenterMenu } from '../all'
import useJSS from './style'
import { stringIn } from '../../helpers/genFuncs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { renameModule } from '../../redux/allActions'


interface Props {
  setRMOpen: (bool: boolean) => void
}

function createSubmitState(isTooShort = false, isAlreadyTaken = false) { // default is deactivated
  return { isTooShort, isAlreadyTaken }
}

function RenameMenu({ setRMOpen }: Props) {
  const classes = useJSS()
  const renameInputRef = useRef<HTMLInputElement>(null)
  const modules = useSelector((state: RootState) => state.modules)
  const existingIDs = Object.keys(modules)
  const dispatch = useDispatch()
  const [ { isTooShort, isAlreadyTaken }, setSubmitState] = useState(createSubmitState())
  function submitNewName() {
    if (renameInputRef && renameInputRef.current) {
      const newName = renameInputRef.current.value
      if (newName.length === 0) {
        setSubmitState(createSubmitState(true, false))
      } else if (stringIn(newName, existingIDs)) {
        setSubmitState(createSubmitState(false, true))
      } else {
        dispatch(renameModule(window.highlightedID, newName))
        window.reRenderLeftDrawer()
        setRMOpen(false)
      } 
    }
  }
  return (
    <CenterMenu header='rename' onClose={() => {setRMOpen(false)}}>
        <div className={classes.CMInputBounder}>
          <input className={classes.CenterMenuInput}
            placeholder={modules[window.highlightedID].name}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                submitNewName()
              } else if (event.keyCode === 27) {
                setRMOpen(false)
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