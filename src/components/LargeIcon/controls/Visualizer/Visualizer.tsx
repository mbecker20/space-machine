import React from 'react'
import { sizes } from '../../../../theme/theme'
import BabylonCanvas from '../../../BabylonCanvas/BabylonCanvas'

interface Props {
  modID: string
}

function Visualizer({ modID }: Props) {
  return (
    <BabylonCanvas
      onSceneReady={scene => {
        
      }}
      onRender={scene => {
        
      }}
      style={{
        borderRadius: '.8em',
        marginTop: '1em',
      }}
      width={sizes.moduleView.bigIconWidth}
      height='200px'
    />
  )
}

export default Visualizer