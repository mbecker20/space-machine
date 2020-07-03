import React, { Fragment, useState } from 'react'
import { CenterMenu, Button } from '../all'
import { connect } from '../../audioModules/connection'
import { useDispatch } from 'react-redux'
import { ConnectingAudioModule, VALUE } from '../../audioModules/moduleTypes'
import { addConnection } from '../../redux/allActions'
import CSS from 'csstype'
import { stringIn } from '../../helpers/genFuncs'

interface Props {
  fromID: string
  toID: string
  onClose: () => void
}

const buttonStyle: CSS.Properties = {
  
}

function ConnectionMenu({ fromID, toID, onClose }: Props) {
  const [openMenu, setOpenMenu] = useState(0)
  const am = window.audioModules
  const dispatch = useDispatch()
  return (
    <Fragment>
      {openMenu === 0 ?
        <CenterMenu header={'connect to'} onClose={() => {
          setOpenMenu(0)
          onClose()
        }}>
          <Button style={buttonStyle}
            onClick={() => {
              connect(am[fromID] as ConnectingAudioModule, am[toID])
              dispatch(addConnection(fromID, toID))
              setOpenMenu(0)
              onClose()
            }}
          >module</Button>
          {stringIn(VALUE, am[toID].paramIDs.flat()) ? null :
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
          {am[toID].paramIDs.filter(paramData => paramData[1] === VALUE).map((paramData, key) => {
            return (
            <Button key={fromID + toID + key}
              onClick={() => {
                connect(am[fromID] as ConnectingAudioModule, am[toID], paramData[0])
                dispatch(addConnection(fromID, toID, paramData[0]))
                setOpenMenu(0)
                onClose()
              }}
            >{paramData[0]}</Button>
            )
          })}
        </CenterMenu>
      }
      
    </Fragment>
  )
}

export default ConnectionMenu