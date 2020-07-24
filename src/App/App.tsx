import React, { useState } from 'react'
import useJSS from './style'
import { RightDrawer, LeftDrawer, ModuleViewFill, AudioTags, ConnectionMenu, PointerLayer } from '../components/all'
import { AudioModules, ModuleType } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'
import { Dispatch } from 'redux'
import { makeConnectionMenuData, makePointerLayerData } from './makeData'
import { PointerEventCallback } from '../components/PointerLayer/PointerLayer'

declare global {
  interface Window { 
    highlightedID: string
    fillContainerID: string
    audioModules: AudioModules
    addModule: (id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) => void
    openConnectionMenu: (fromID: string, toID: string) => void
    openPointerLayer: (pointerId: number, onPointerMove: PointerEventCallback, onPointerUp: PointerEventCallback) => void
  }

  interface AudioNode {
    [index: string]: AudioParam
  }
}

window.highlightedID = 'project' // make this '', for dev
window.fillContainerID = 'project'

window.audioModules = {}
window.addModule = makeAddModule()

function App() {
  const classes = useJSS()
  const [connectionMenuData, setConnectionMenuData] = useState(makeConnectionMenuData(false))
  window.openConnectionMenu = (fromID, toID) => { setConnectionMenuData(makeConnectionMenuData(true, fromID, toID)) }
  const [ pointerLayerData, setPointerLayerData ] = useState(makePointerLayerData(false))
  window.openPointerLayer = (pointerId, onPointerMove, onPointerUp) => { setPointerLayerData(makePointerLayerData(true, pointerId, onPointerMove, onPointerUp)) }
  const resetPointerLayerData = () => { setPointerLayerData(makePointerLayerData(false)) }
  return (
    <div className={classes.Bounder}>
      <LeftDrawer />
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill />
      </div>
      <RightDrawer />
      <AudioTags />
      {
        !connectionMenuData.isOpen ? null :
        <ConnectionMenu fromID={connectionMenuData.fromID} toID={connectionMenuData.toID} 
          onClose={() => {
            setConnectionMenuData(makeConnectionMenuData(false))
          }}
        />
      }
      {
        !pointerLayerData.isOpen ? null :
        <PointerLayer pointerLayerData={ pointerLayerData } resetPointerLayerData={resetPointerLayerData}/>
      }
    </div>
  )
}

export default App
