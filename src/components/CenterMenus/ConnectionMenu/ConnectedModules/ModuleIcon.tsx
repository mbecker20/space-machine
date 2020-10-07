import React from 'react'
import { AnyModule } from '../../../../redux/stateTSTypes'
import useJSS from '../style'

interface Props {
  mod: AnyModule
  isFrom: boolean
}

function ModuleIcon({ mod, isFrom }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ModuleIcon}>
      
    </div>
  )
}

export default ModuleIcon