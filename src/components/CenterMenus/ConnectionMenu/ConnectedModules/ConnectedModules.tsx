import React from 'react'
import { ArcherContainer } from 'react-archer'
import { AnyModule } from '../../../../redux/stateTSTypes'
import FlexRow from '../../../Flex/FlexRow'
import useJSS from '../style'
import ModuleIcon from './ModuleIcon'

interface Props {
  fromMod: AnyModule
  toMod: AnyModule
}

function ConnectedModules({ fromMod, toMod }: Props) {
  const classes = useJSS()
  return (
    <ArcherContainer>
      <FlexRow style={{ justifyContent: 'space-between' }}>
        <ModuleIcon mod={fromMod} isFrom={true} />
        <ModuleIcon mod={toMod} isFrom={false} />
      </FlexRow>
    </ArcherContainer>
  )
}

export default ConnectedModules