import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../../../audioModules/connection'
import { ConnectingAudioModule } from '../../../audioModules/moduleTypes'
import { addConnection } from '../../../redux/allActions'
import { Module, RootState } from '../../../redux/stateTSTypes'
import getModuleColor from '../../../theme/moduleColor'
import { colors } from '../../../theme/theme'
import AutoPlacingGrid from '../../AutoPlacingGrid.tsx/AutoPlacingGrid'
import FlexCol from '../../Flex/FlexCol'
import FlexRow from '../../Flex/FlexRow'
import { connectionExists, executeConnection } from './helpers'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
  fromID: string // of the original modules that made the connection
  toID: string
  isFromContainer: boolean
  isToContainer: boolean
  onClose: () => void
}

function InModule({ modID, startsBig, fromID, toID, isFromContainer, isToContainer, onClose }: Props) {
  const classes = useJSS()
  const mod = useSelector((state: RootState) => state.modules[modID])
  const { modules, connections } = useSelector((state: RootState) => state)
  const audioMod = window.audioModules[modID]
  const am = window.audioModules
  const [isBig, setBig] = useState(startsBig)
  const dispatch = useDispatch()
  return (
    <div className={classes.Module} style={{ backgroundColor: getModuleColor(mod.moduleType) }}>
      <div className={classes.Name}
        style={{ marginBottom: '.2em' }}
        onClick={() => { setBig(!isBig) }}
      >{mod.name}</div>
      <FlexRow style={{ justifyContent: 'center' }}>
        <FlexCol style={{ marginRight: audioMod.connectingParamIDs.length !== 0 ?'.4em' : '0em' }}>
          {!isBig ? null : mod.connectionInputs.map((input, index) => {
            return (
              <FlexCol key={index}>
                <div className={classes.ConnectionReciever}
                  onDragOver={e => { e.preventDefault() }}
                  onDrop={e => {
                    e.preventDefault()
                    const actualFromID = e.dataTransfer.getData('actualFromID')
                    const outputIndex = Number(e.dataTransfer.getData('outputIndex'))
                    executeConnection(
                      fromID, actualFromID, 
                      toID, modID, modules, 
                      connections, dispatch, 
                      outputIndex, index,
                      onClose)
                  }}
                />
                {mod.connectionInputs.length !== 1 ? input : null}
              </FlexCol>
            )
          })}
        </FlexCol>
        {audioMod.connectingParamIDs.length === 0 ? null : 
        <AutoPlacingGrid direction='row' numCols='2' gap='.2em'>
          {!isBig ? null : audioMod.connectingParamIDs.map((paramID, index) => {
            return (
              <FlexCol style={{ alignItems: 'center' }} key={index}
                onDragOver={e => { e.preventDefault() }}
                onDrop={e => {
                  e.preventDefault()
                  const actualFromID = e.dataTransfer.getData('actualFromID')
                  const fromMod = modules[actualFromID]
                  const outputIndex = Number(e.dataTransfer.getData('outputIndex'))
                  if (!connectionExists(connections, fromMod as Module, modID, paramID)) {
                    connect(
                      am[actualFromID] as ConnectingAudioModule,
                      am[modID] as ConnectingAudioModule,
                      paramID,
                      outputIndex,
                      0,
                    )
                    dispatch(addConnection(
                      fromID,
                      toID,
                      paramID,
                      outputIndex,
                      0,
                      isFromContainer ? actualFromID : undefined,
                      isToContainer ? modID : undefined,
                    ))
                    window.flashNotification(colors.success, 'connection created')
                    onClose()
                  } else {
                    alert('modules already connected')
                  }
                }}
              >
                <div className={classes.SmallConnectionReciever}/>
                <div className={classes.ParamName}>{paramID}</div>
              </FlexCol>
            )
          })}
        </AutoPlacingGrid>}
      </FlexRow>
    </div>
  )
}

export default InModule