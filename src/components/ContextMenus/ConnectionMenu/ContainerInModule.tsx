import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../audioModules/moduleTypes'
import { ContainerModule, RootState } from '../../../redux/stateTSTypes'
import getModuleColor from '../../../theme/moduleColor'
import AutoPlacingGrid from '../../AutoPlacingGrid/AutoPlacingGrid'
import InModule from './InModule'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
  fromID: string // original fromID of connection
  toID: string
  isFromContainer: boolean
  onClose: () => void
  isBase: boolean
}

function ContainerInModule({ modID, startsBig, fromID, toID, isFromContainer, onClose, isBase }: Props) {
  const classes = useJSS()
  const modules = useSelector((state: RootState) => state.modules)
  const mod = modules[modID]
  const modInputs = (mod as ContainerModule).connectionInputs
  const childrenStartBig = modInputs.length <= 2
  const [isBig, setBig] = useState(startsBig)
  return (
    <div className={classes.Module} 
      style={{
        backgroundColor: getModuleColor(CONTAINER),
        maxHeight: isBase ? '60vmin' : '40vmin',
        overflowY: isBase ? 'scroll' : 'visible',
      }}
    >
      <div className={classes.Name}
        onClick={() => { setBig(!isBig) }}
      >{mod.name}</div>
      <AutoPlacingGrid direction={'row'} numCols={2} gap={'.2em'}>
        {!isBig ? null : modInputs.map((inputModID, index) => {
          const inMod = modules[inputModID]
          if(inMod.moduleType === CONTAINER) {
            return (
              <ContainerInModule key={index} 
                modID={inputModID}
                fromID={fromID}
                toID={toID}
                isFromContainer={isFromContainer}
                onClose={onClose}
                isBase={false}
                startsBig={childrenStartBig}
              />
            )
          } else {
            return (
              <InModule key={index}
                modID={inputModID}
                fromID={fromID}
                toID={toID}
                onClose={onClose}
                startsBig={childrenStartBig}
              />
            )
          }
        })}
      </AutoPlacingGrid>
    </div>
  )
}

export default ContainerInModule