import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../all'
import { connect } from '../../audioModules/connection'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectingAudioModule, OSCILLATOR, CONSTANT } from '../../audioModules/moduleTypes'
import { addConnection } from '../../redux/allActions'
import CSS from 'csstype'
import { RootState } from '../../redux/stateTSTypes'

interface Props {
  fromID: string
  toID: string
  toType: string
  onClose: () => void
}

export const CHOOSE_OUTPUT = 'CHOOSE_OUTPUT'
export const CONNECT_TO = 'CONNECT_TO'
export const CHOOSE_PARAM = 'CHOOSE_PARAM'

const buttonStyle: CSS.Properties = {
  
}

function ConnectionMenu({ fromID, toID, toType, onClose }: Props) {
  const am = window.audioModules
  const initMenu = am[fromID].connectionOutputs.length === 1 ? CONNECT_TO : CHOOSE_OUTPUT
  const [openMenu, setOpenMenu] = useState(initMenu)
  const [output, setOutput] = useState(0)
  const dispatch = useDispatch()
  const [ fromMod, toMod ] = useSelector((state: RootState) => {
    return [ 
      state.modules[fromID], 
      state.modules[toID],
    ]
  })
  return (
    <Fragment>
      {openMenu === CONNECT_TO
      ?
      <CenterMenu header={`connect ${fromMod.name} to ${toMod.name}`} onClose={onClose}>
        {toType === OSCILLATOR || toType === CONSTANT ? null :
        <Button style={buttonStyle}
          onClick={() => {
            if (am[fromID])
            connect(am[fromID] as ConnectingAudioModule, am[toID], '', output)
            dispatch(addConnection(fromID, toID))
            console.log(output)
            onClose()
          }}
        >module</Button>}
        {am[toID].connectingParamIDs.length === 0 ? null :
        <Button style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(CHOOSE_PARAM)
          }}
        >params</Button>}
      </CenterMenu>
      :
      openMenu === CHOOSE_PARAM
      ?
      <CenterMenu header={'props'} onClose={onClose}>
        {am[toID].connectingParamIDs.map((paramID, key) => {
          return (
          <Button key={fromID + toID + key}
            onClick={() => {
              connect(am[fromID] as ConnectingAudioModule, am[toID], paramID, output)
              dispatch(addConnection(fromID, toID, paramID))
              onClose()
            }}
          >{paramID}</Button>
          )
        })}
      </CenterMenu>
      :
      openMenu === CHOOSE_OUTPUT
      ?
      <CenterMenu header={'choose output'} onClose={onClose}>
        {am[fromID].outputs.map((outputID, index) => {
          return (
            <Button key={fromID + toID + outputID}
              onClick={(e) => {
                e.stopPropagation()
                setOutput(index)
                setOpenMenu(CONNECT_TO)
              }}
            >{outputID}</Button>
          )
        })}
      </CenterMenu>
      :
      null
      }
    </Fragment>
  )
}

export default ConnectionMenu