import React from 'react'
import BabylonCanvas from '../../BabylonCanvas/BabylonCanvas'

interface Props {
  modID: string
}

function Tuner({ modID }: Props) {
  return (
    <BabylonCanvas
      onRender={scene => {
        
      }}
      adaptToDeviceRatio
    />
  )
}

export default Tuner