import React, { useState } from 'react'
import useJSS from './style'
import { AudioModules } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'
import { makePointerLayerData } from '../components/PointerLayer/makeData'
import PointerLayer, { PointerEventCallback } from '../components/PointerLayer/PointerLayer'
import configureSpaceDB from './configureSpaceDB'
import setUserAgent from './setUserAgent'
import ContextMenus from '../components/ContextMenus/ContextMenus'
import ModuleViewFill from '../components/ModuleView/Fill'
import RightDrawer from '../components/RightDrawer/RightDrawer'
import AudioTags from '../components/AudioTags/AudioTags'
import CenterMenus from '../components/CenterMenus/CenterMenus'
import Notification from '../components/Notification/Notification'

declare global {
  interface Window { 
    fillContainerID: string
    audioModules: AudioModules
    openPointerLayer: (pointerId: number, onPointerMove: PointerEventCallback, onPointerUp: PointerEventCallback) => void
  }

  interface AudioNode {
    [index: string]: AudioParam
  }
}

window.fillContainerID = 'project'

makeAddModule()
configureSpaceDB()
setUserAgent()

function App() {
  const classes = useJSS()
  const [ pointerLayerData, setPointerLayerData ] = useState(makePointerLayerData(false))
  window.openPointerLayer = (pointerId, onPointerMove, onPointerUp) => { setPointerLayerData(makePointerLayerData(true, pointerId, onPointerMove, onPointerUp)) }
  const resetPointerLayerData = () => { setPointerLayerData(makePointerLayerData(false)) }
  return (
    <div className={classes.Bounder}>
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill />
      </div>
      <RightDrawer />
      <AudioTags />
      {
        !pointerLayerData.isOpen ? null :
        <PointerLayer pointerLayerData={ pointerLayerData } resetPointerLayerData={resetPointerLayerData}/>
      }
      <CenterMenus />
      <ContextMenus />
      <Notification />
    </div>
  )
}

export default App
