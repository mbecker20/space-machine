import React from 'react'
import Button from '../Button/Button'
import TrashSVG from '../SVG/TrashSVG'
import useJSS from './style'

interface Props {
  onClick: () => void
}

function DeleteButton({ onClick }: Props) {
  const classes = useJSS()
  return (
    <Button className={classes.DeleteButtonBounder}
      onPointerDown={e => { e.stopPropagation() }}
      onClick={onClick}
    >
      <TrashSVG className={classes.DeleteButtonSVG}
        alt={'delete'}
      />
    </Button>
  )
}

export default DeleteButton