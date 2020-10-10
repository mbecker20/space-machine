import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../../audioModules/moduleTypes'
import { ContainerModule, RootState } from '../../../../redux/stateTSTypes'
import getModuleColor from '../../../../theme/moduleColor'
import InModule from './InModule'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
  fromID: string // original fromID of connection
  toID: string
  isFromContainer: boolean
  onClose: () => void
}

function ContainerInModule({ modID, startsBig, fromID, toID, isFromContainer, onClose }: Props) {
  const classes = useJSS()
  const modules = useSelector((state: RootState) => state.modules)
  const mod = modules[modID]
  const modInputs = (mod as ContainerModule).connectionInputs
  //const childrenStartBig = modInputs.length === 1
  const [isBig, setBig] = useState(startsBig)
  return (
    <div className={classes.Module} 
      style={{
        backgroundColor: getModuleColor(CONTAINER)
      }}
    >
      <div className={classes.Name}
        onClick={() => { setBig(!isBig) }}
      >{mod.name}</div>
      <div className={classes.ChildBounder}>
        {!isBig ? null : modInputs.map((inputModID, index) => {
          const inMod = modules[inputModID]
          if(inMod.moduleType === CONTAINER) {
            return (
              <ContainerInModule key={index} 
                modID={inputModID}
                startsBig={true}
                fromID={fromID}
                toID={toID}
                isFromContainer={isFromContainer}
                onClose={onClose}
              />
            )
          } else {
            return (
              <InModule key={index}
                modID={inputModID}
                startsBig={true}
                fromID={fromID}
                toID={toID}
                isFromContainer={true}
                isToContainer={true}
                onClose={onClose}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default ContainerInModule