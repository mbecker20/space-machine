import React, { ReactNode } from 'react'
import { ArcherContainer } from 'react-archer'
import useJSS from './style'

interface Props {
  children: ReactNode
}

function ConnectedModules({ children }: Props) {
  const classes = useJSS()
  return (
    <ArcherContainer>

    </ArcherContainer>
  )
}

export default ConnectedModules