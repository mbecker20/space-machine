import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../all'
import { Module } from '../../redux/stateTSTypes'
import { connect } from '../../audioModules/connection'
import { useDispatch } from 'react-redux'

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
            onClick={() => {
              setOpenMenu(1)
            }}
          >props</Button>
        </CenterMenu>
        :
        <CenterMenu header={'props'} onClose={() => {}}>
          {am[fromMod.id].paramIDs.map((id, key) => {
            return (
              <div></div>
            )
          })}
        </CenterMenu>
      }
      
    </Fragment>
  )
}

export default ConnectionMenu