import React, { useRef, useState } from 'react'
import { CenterMenu } from '../all'
import useJSS from './style'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'
import { renameModule } from '../../redux/allActions'


interface Props {
  onClose: () => void
}

function RenameMenu({ onClose }: Props) {
  const classes = useJSS()
  const renameInputRef = useRef<HTMLInputElement>(null)
  const modules = useSelector((state: RootState) => state.modules)
  const dispatch = useDispatch()
  const [ isTooShort, setSubmitState] = useState(false)
  function submitNewName() {
    if (renameInputRef && renameInputRef.current) {
      const newName = renameInputRef.current.value
      if (newName.length === 0) {
        setSubmitState(true)
      } else {
        dispatch(renameModule(window.highlightedID, newName))
        onClose()
      } 
    }
  }
  return (
    <CenterMenu header='rename' onClose={onClose}>
        <div className={classes.CMInputBounder}>
          <input className={classes.CenterMenuInput}
            placeholder={modules[window.highlightedID]?.name}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                submitNewName()
              } else if (event.keyCode === 27) {
                onClose()
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
      </CenterMenu>
  )
}

export default RenameMenu