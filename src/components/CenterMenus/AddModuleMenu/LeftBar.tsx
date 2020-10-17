import React from 'react'
import { colors } from '../../../theme/theme'
import Button from '../../Button/Button'
import FlexCol from '../../Flex/FlexCol'
import { addModuleMenuGroups, SPACEDB_MODULES } from './AddModuleMenu'
import useJSS from './style'

interface Props {
  selectedGroup: string
  setSG: (arg: string) => void
}

function LeftBar({ selectedGroup, setSG }: Props) {
  const classes = useJSS()
  return (
    <FlexCol className={classes.LeftBar}>
      {addModuleMenuGroups.filter(group => window.usingElectron || group !== SPACEDB_MODULES)
      .map((group, index) => {
        const isHL = group === selectedGroup
        return (
          <Button className={classes.LeftBarButton}
            key={index}
            style={{
              color: isHL ? colors.selectedText : 'white',
            }}
            onClick={() => {
              setSG(group)
            }}
          >
            { group }
          </Button>
        )
      })}
    </FlexCol>
  )
}

export default LeftBar