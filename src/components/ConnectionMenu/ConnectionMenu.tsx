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
  initMenu: string
}

export const CHOOSE_OUTPUT = 'CHOOSE_OUTPUT'
export const CONNECT_TO = 'CONNECT_TO'
export const CHOOSE_PARAM = 'CHOOSE_PARAM'

const buttonStyle: CSS.Properties = {
  
}

function ConnectionMenu({ fromID, toID, toType, onClose, initMenu }: Props) {
  const [openMenu, setOpenMenu] = useState(initMenu)
  const am = window.audioModules
  const dispatch = useDispatch()
  const [ fromName, toName ] = useSelector((state: RootState) => {
    return [ 
      state.modules[fromID].name, 
      state.modules[toID].name,
    ]
  })
  return (
    <Fragment>
      {openMenu === CONNECT_TO
      ?
      <CenterMenu header={`connect ${fromName} to ${toName}`} onClose={onClose}>
        {toType === OSCILLATOR || toType === CONSTANT ? null :
        <Button style={buttonStyle}
          onClick={() => {
            connect(am[fromID] as ConnectingAudioModule, am[toID])
            dispatch(addConnection(fromID, toID))
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
              connect(am[fromID] as ConnectingAudioModule, am[toID], paramID)
              dispatch(addConnection(fromID, toID, paramID))
              setOpenMenu(0)
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
        {am[toID].connectingParamIDs.map((paramID, key) => {
          return (
            <Button key={fromID + toID + key}
              onClick={() => {
                connect(am[fromID] as ConnectingAudioModule, am[toID], paramID)
                dispatch(addConnection(fromID, toID, paramID))
                setOpenMenu(0)
                onClose()
              }}
            >{paramID}</Button>
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