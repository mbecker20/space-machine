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

const buttonStyle: CSS.Properties = {
  
}

function ConnectionMenu({ fromID, toID, toType, onClose }: Props) {
  const [openMenu, setOpenMenu] = useState(0)
  const am = window.audioModules
  const dispatch = useDispatch()
  const { fromName, toName } = useSelector((state: RootState) => {
    return {
      fromName: state.modules[fromID].name,
      toName: state.modules[toID].name,
    }
  })
  return (
    <Fragment>
      {openMenu === 0 ?
        <CenterMenu header={`connect ${fromName} to ${toName}`} onClose={() => {
          setOpenMenu(0)
          onClose()
        }}>
          {toType === OSCILLATOR || toType === CONSTANT ? null :
          <Button style={buttonStyle}
            onClick={() => {
              connect(am[fromID] as ConnectingAudioModule, am[toID])
              dispatch(addConnection(fromID, toID))
              setOpenMenu(0)
              onClose()
            }}
          >module</Button>}
          {am[toID].connectingParamIDs.length === 0 ? null :
          <Button style={buttonStyle}
            onClick={(e) => {
              e.stopPropagation()
              setOpenMenu(1)
            }}
          >params</Button>}
        </CenterMenu>
        :
        <CenterMenu header={'props'} onClose={() => {
          setOpenMenu(0)
          onClose()
        }}>
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
      }
      
    </Fragment>
  )
}

export default ConnectionMenu