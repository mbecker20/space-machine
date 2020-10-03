import React, { useState } from 'react'
import Button from '../../Button/Button'
import CenterMenu from '../CenterMenu/CenterMenu'
import useJSS from './style'

interface Props {
  isOpen: boolean
  header: string
  onSubmit: (newName: string) => void
  placeholder: string
  onClose: () => void
}

function RenameMenu({ isOpen, header, onSubmit, placeholder, onClose }: Props) {
  const classes = useJSS()
  const [val, setVal] = useState('')
  const [isTooShort, setIsTooShort] = useState(false)
  function trySubmit() {
    if (val.length > 0) {
      onSubmit(val)
      onClose()
      setVal('')
    } else {
      setIsTooShort(true)
    }
  }
  return (
    <CenterMenu isClosed={!isOpen} header={header} onClose={() => { onClose(); setVal('') }}>
      <div className={classes.CMInputBounder}>
        <input className={classes.CenterMenuInput}
          placeholder={placeholder}
          value={val}
          onChange={e => {
            setVal(e.target.value)
          }}
          onKeyDown={e => {
            switch (e.key) {
              case 'Enter':
                trySubmit()
                break
              case 'Escape':
                onClose()
                break
            }
          }}
          autoFocus
        />
        <Button
          onClick={() => {
            trySubmit()
          }}
        >
          confirm
        </Button>
        {
          !isTooShort ? null :
          <div className={classes.Error}>
            please enter a name
          </div>
        }
      </div>
    </CenterMenu>
  )
}

export default RenameMenu