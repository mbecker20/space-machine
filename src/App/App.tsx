import React from 'react'
import useJSS from './style'
import { RightDrawer, LeftDrawer, ModuleViewFill, MrTesterr } from '../components/all'
import { useSelector } from 'react-redux'
import { RootState, ContainerModule } from '../redux/stateTSTypes'
import { AudioModules, ModuleType } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'

declare global {
  interface Window { 
    highlightedID: string
    fillContainerID: string
    linkToOutputID: string
    audioModules: AudioModules
    addModule: (id: string, moduleType: ModuleType) => void
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
  const modules = useSelector((state: RootState) => {
    return state.modules
  })
  return (
    <div className={classes.Bounder}>
      <MrTesterr />
      <LeftDrawer />
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill containerModule={modules[window.fillContainerID] as ContainerModule}/>
      </div>
      <RightDrawer />
    </div>
  )
}

export default App
