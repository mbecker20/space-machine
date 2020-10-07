import React, { ReactNode } from 'react'
import { ArcherContainer } from 'react-archer'
import { AnyModule } from '../../../../redux/stateTSTypes'
import useJSS from '../style'

interface Props {
  fromMod: AnyModule
  toMod: AnyModule
}

function ConnectedModules({ fromMod, toMod }: Props) {
  const classes = useJSS()
  return (
    <ArcherContainer>
      
    </ArcherContainer>
  )
}

export default ConnectedModules