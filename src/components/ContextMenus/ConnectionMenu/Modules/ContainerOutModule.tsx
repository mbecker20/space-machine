import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../../audioModules/moduleTypes'
import { ContainerModule, RootState } from '../../../../redux/stateTSTypes'
import getModuleColor from '../../../../theme/moduleColor'
import AutoPlacingGrid from '../../../AutoPlacingGrid.tsx/AutoPlacingGrid'
import OutModule from './OutModule'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
  isBase: boolean // is the lowest one in the tree for connection
}

export type OutModType = {
  setBig: (isBig: boolean) => void
}

function ContainerOutModule({ modID, startsBig, isBase }: Props) {
  const classes = useJSS()
  const modules = useSelector((state: RootState) => state.modules)
  const mod = modules[modID]
  const modOutputs = (mod as ContainerModule).connectionOutputs
  const childrenStartBig = modOutputs.length <= 2
  const [isBig, setBig] = useState(startsBig)
  return (
    <div className={classes.Module} 
      style={{ 
        backgroundColor: getModuleColor(mod.moduleType),
        marginRight: isBase ? '1em' : '0em',
        maxHeight: isBase ? '60vmin' : '40vmin',
        overflowY: isBase ? 'scroll' : 'visible',
      }}>
      <div className={classes.Name}
        onClick={() => { setBig(!isBig) }}
      >{ mod.name }</div>
      <AutoPlacingGrid direction={'row'} numCols={2} gap={'.2em'}>
        {!isBig ? null : modOutputs.map((outputModID, index) => {
          const outMod = modules[outputModID]
          if (outMod.moduleType === CONTAINER) {
            return (
              <ContainerOutModule key={index}
                modID={outputModID} 
                startsBig={childrenStartBig}
                isBase={false}
              />
            )
          } else {
            return (
              <OutModule key={index} 
                modID={outputModID}
                startsBig={childrenStartBig}
                isBase={false}
              />
            )
          }
        })}
      </AutoPlacingGrid>
    </div>
  )
}

export default ContainerOutModule