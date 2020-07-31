import React, { useState } from 'react'
import useJSS from './style'
import { RightDrawer, ModuleViewFill, AudioTags, CenterMenus, PointerLayer } from '../components/all'
import { AudioModules, ModuleType } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'
import { Dispatch } from 'redux'
import { makePointerLayerData } from '../components/PointerLayer/makeData'
import { PointerEventCallback } from '../components/PointerLayer/PointerLayer'

declare global {
  interface Window { 
    highlightedID: string
    fillContainerID: string
    audioModules: AudioModules
    addModule: (id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) => void
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
  const [ pointerLayerData, setPointerLayerData ] = useState(makePointerLayerData(false))
  window.openPointerLayer = (pointerId, onPointerMove, onPointerUp) => { setPointerLayerData(makePointerLayerData(true, pointerId, onPointerMove, onPointerUp)) }
  const resetPointerLayerData = () => { setPointerLayerData(makePointerLayerData(false)) }
  return (
    <div className={classes.Bounder} onPointerDown={() => {
      window.currUnHighlight()
      window.currUnHighlight = () => { }
    }}>
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
    </div>
  )
}

export default App
