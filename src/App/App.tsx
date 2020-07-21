import React from 'react'
import useJSS from './style'
import { RightDrawer, LeftDrawer, ModuleViewFill, AudioTags } from '../components/all'
import { AudioModules, ModuleType } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'
import { Dispatch } from 'redux'

declare global {
  interface Window { 
    highlightedID: string
    fillContainerID: string
    linkToOutputID: string
    audioModules: AudioModules
    addModule: (id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) => void
  }

  interface AudioNode {
    [index: string]: AudioParam
  }
}

window.highlightedID = 'project' // make this '', for dev
window.fillContainerID = 'project'
window.linkToOutputID = ''

window.audioModules = {}
window.addModule = makeAddModule()

function App() {
  const classes = useJSS()
  return (
    <div className={classes.Bounder}>
      <LeftDrawer />
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill />
      </div>
      <RightDrawer />
      <AudioTags />
    </div>
  )
}

export default App
