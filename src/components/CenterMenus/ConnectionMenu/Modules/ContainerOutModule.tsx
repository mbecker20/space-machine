import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CONTAINER } from '../../../../audioModules/moduleTypes'
import { ContainerModule, RootState } from '../../../../redux/stateTSTypes'
import getModuleColor from '../../../../theme/moduleColor'
import OutModule from './OutModule'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
  isBase: boolean // is the lowest one in the tree for connection
}

function ContainerOutModule({ modID, startsBig, isBase }: Props) {
  const classes = useJSS()
  const modules = useSelector((state: RootState) => state.modules)
  const mod = modules[modID]
  const modOutputs = (mod as ContainerModule).connectionOutputs
  //const childrenStartBig = modOutputs.length === 1
  const [isBig, setBig] = useState(startsBig)
  return (
    <div className={classes.Module} 
      style={{ 
        backgroundColor: getModuleColor(mod.moduleType),
        marginRight: isBase ? '1em' : '0em',
        maxHeight: isBase ? '60vmin' : '40vmin',
      }}>
      <div className={classes.Name}
        onClick={() => { setBig(!isBig) }}
      >{ mod.name }</div>
      <div className={classes.ChildBounder}>
        {!isBig ? null : modOutputs.map((outputModID, index) => {
          const outMod = modules[outputModID]
          if (outMod.moduleType === CONTAINER) {
            return (
              <ContainerOutModule key={index}
                modID={outputModID} 
                startsBig={true}
                isBase={false}
              />
            )
          } else {
            return (
              <OutModule key={index} 
                modID={outputModID}
                startsBig={true}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default ContainerOutModule