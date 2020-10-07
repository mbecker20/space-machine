import React from 'react'
import { ArcherElement } from 'react-archer'
import { AnyModule } from '../../../../redux/stateTSTypes'
import getModuleColor from '../../../../theme/moduleColor'
import { sizes } from '../../../../theme/theme'
import useJSS from './style'

interface Props {
  mod?: AnyModule
  isFrom: boolean
}

function ModuleIcon({ mod, isFrom }: Props) {
  const classes = useJSS()
  return (
    <ArcherElement id={isFrom ? 'from' : 'to'}
      relations={isFrom ? [{
        targetId: 'to',
        targetAnchor: 'left',
        sourceAnchor: 'right',
      }] : undefined}
    >
      <div className={classes.ModuleIcon}
        style={{ 
          backgroundColor: getModuleColor(mod?.moduleType),
          marginRight: isFrom ? sizes.moduleView.icon : '0vmin'
        }}
      >
        {mod?.name}
      </div>
    </ArcherElement>
  )
}

export default ModuleIcon