import React, { Fragment } from 'react'
import DrawerItem from '../DrawerItem'
import { 
  CONTAINER,
  OSCILLATOR,
  AUTOFILTER,
  GAIN,
  OUTPUT,
  KOMPRESSOR,
  SIGNAL_DELAY,
  STEREO_PANNER,
  CONSTANT,
  MEDIA_ELEMENT
} from '../../../audioModules/moduleTypes'

function BaseModules() {
  return (
    <Fragment>
      <DrawerItem fullName='oscillator' id='osc' moduleType={OSCILLATOR}/>
      <DrawerItem fullName='mp3' id='local' moduleType={MEDIA_ELEMENT} />
      <DrawerItem fullName='gain' id='gain' moduleType={GAIN}/>
      <DrawerItem fullName='output' id='out' moduleType={OUTPUT}/>
      <DrawerItem fullName='auto filter' id='filter' moduleType={AUTOFILTER}/>
      <DrawerItem fullName='kompressor' id='komp' moduleType={KOMPRESSOR}/>
      <DrawerItem fullName='stereo panner' id='pan' moduleType={STEREO_PANNER}/>
      <DrawerItem fullName='signal delay' id='dly' moduleType={SIGNAL_DELAY}/>
      <DrawerItem fullName='constant' id='const' moduleType={CONSTANT} />
      <DrawerItem fullName='container' id='cntnr' moduleType={CONTAINER} />
    </Fragment>
  )
}

export default BaseModules