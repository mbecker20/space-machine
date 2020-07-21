import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import {
  AUTOFILTER,
  GAIN,
  KOMPRESSOR,
  SIGNAL_DELAY,
  STEREO_PANNER,
} from '../../../audioModules/moduleTypes'

function EffectModules() {
  return (
    <Fragment>
      <DrawerItem fullName='gain' id='gain' moduleType={GAIN} />
      <DrawerItem fullName='auto filter' id='filter' moduleType={AUTOFILTER} />
      <DrawerItem fullName='kompressor' id='komp' moduleType={KOMPRESSOR} />
      <DrawerItem fullName='stereo panner' id='pan' moduleType={STEREO_PANNER} />
      <DrawerItem fullName='signal delay' id='dly' moduleType={SIGNAL_DELAY} />
    </Fragment>
  )
}

export default EffectModules