import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../all'
import { Module } from '../../redux/stateTSTypes'
import { connect } from '../../audioModules/connection'
import { useDispatch } from 'react-redux'
import { ConnectingAudioModule } from '../../audioModules/moduleTypes'

interface Props {
  fromMod: Module
  toMod: Module
}

function ConnectionMenu({ fromMod, toMod }: Props) {
  const [openMenu, setOpenMenu] = useState(0)
  const am = window.audioModules
  const dispatch = useDispatch()
  return (
    <Fragment>
      {openMenu === 0 ?
        <CenterMenu header={'connect to'} onClose={() => {}}>
          <Button
            onClick={() => {
              
            }}
          >module</Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setOpenMenu(1)
            }}
          >props</Button>
        </CenterMenu>
        :
        <CenterMenu header={'props'} onClose={() => {}}>
          {am[fromMod.id].paramIDs.map((paramID, key) => {
            return (
            <Button key={paramID + key}
              onClick={() => {
                connect(am[fromMod.id] as ConnectingAudioModule, am[toMod.id])
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