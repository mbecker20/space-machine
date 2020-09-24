import React from 'react'
import { Button, FlexCol } from '../../all'
import { addModuleMenuGroups } from './AddModuleMenu'
import useJSS from './style'

interface Props {
  selectedGroup: string
  setSG: (arg: string) => void
}

function LeftBar({ selectedGroup, setSG }: Props) {
  const classes = useJSS()
  return (
    <FlexCol className={classes.LeftBar}>
      {addModuleMenuGroups.map((group, index) => {
        const isHL = group === selectedGroup
        return (
          <Button key={index}
            style={{
              borderRadius: '.2em',
              borderColor: isHL ? 'white' : 'transparent'
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