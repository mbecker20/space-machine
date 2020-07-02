import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../all'
import { Module } from '../../redux/stateTSTypes'
import { connect } from '../../audioModules/connection'
import { useDispatch } from 'react-redux'
import { ConnectingAudioModule } from '../../audioModules/moduleTypes'
import { addConnection } from '../../redux/allActions'

interface Props {
  fromID: string
  toID: string
  onClose: () => void
}

function ConnectionMenu({ fromID, toID, onClose }: Props) {
  const [openMenu, setOpenMenu] = useState(0)
  const am = window.audioModules
  const dispatch = useDispatch()
  return (
    <Fragment>
      {openMenu === 0 ?
        <CenterMenu header={'connect to'} onClose={onClose}>
          <Button style={{}}
            onClick={() => {
              connect(am[fromID] as ConnectingAudioModule, am[toID])
              dispatch(addConnection(fromID, toID))
            }}
          >module</Button>
          <Button style={{}}
            onClick={(e) => {
              e.stopPropagation()
              setOpenMenu(1)
            }}
          >props</Button>
        </CenterMenu>
        :
        <CenterMenu header={'props'} onClose={() => {}}>
          {am[toID].paramIDs.map((paramID, key) => {
            return (
            <Button key={paramID + key}
              onClick={() => {
                connect(am[fromID] as ConnectingAudioModule, am[toID], paramID)
                dispatch(addConnection(fromID, toID, paramID))
                setOpenMenu(0)
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