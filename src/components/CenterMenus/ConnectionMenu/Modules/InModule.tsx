import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/stateTSTypes'
import getModuleColor from '../../../../theme/moduleColor'
import FlexCol from '../../../Flex/FlexCol'
import FlexRow from '../../../Flex/FlexRow'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
}

function InModule({ modID, startsBig }: Props) {
  const classes = useJSS()
  const mod = useSelector((state: RootState) => state.modules[modID])
  const am = window.audioModules[modID]
  const [isBig, setBig] = useState(startsBig)
  return (
    <div className={classes.Module} style={{ backgroundColor: getModuleColor(mod.moduleType) }}>
      <div className={classes.Name}
        onClick={() => { setBig(!isBig) }}
      >{mod.name}</div>
      <FlexRow>
        {!isBig ? null : mod.connectionInputs.map((input, index) => {
          return (
            <FlexCol key={index}>
              <div className={classes.ConnectionReciever}
                onDrop={e => {

                }}
              />
              {mod.connectionInputs.length !== 1 ? input : null}
            </FlexCol>
          )
        })}
        {!isBig ? null : am.connectingParamIDs.map((param, index) => {
          return (
            <FlexCol key={index}>
              <div className={classes.SmallConnectionReciever}
                onDrop={e => {

                }}
              />
              <div className={classes.ParamName}>{param}</div>
            </FlexCol>
          )
        })}
      </FlexRow>
    </div>
  )
}

export default InModule