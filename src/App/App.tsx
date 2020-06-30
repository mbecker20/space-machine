import React from 'react'
import useJSS from './style'
import { RightDrawer, LeftDrawer, ModuleViewFill } from '../components/all'
import { useSelector } from 'react-redux'
import { RootState, ContainerModule } from '../redux/stateTSTypes'
import { AudioModules, ModuleType } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'

declare global {
  interface Window { 
    highlightedID: string
    fillContainerID: string
    linkToOutputID: string
    linkIsConnecting: boolean
    audioModules: AudioModules
    addModule: (id: string, moduleType: ModuleType) => void
  }
}

window.highlightedID = 'project' // make this '', for dev
window.fillContainerID = 'project'
window.linkToOutputID = ''
window.linkIsConnecting = true

window.audioModules = {}
window.addModule = makeAddModule()

function App() {
  const classes = useJSS()
  const modules = useSelector((state: RootState) => {
    return state.modules
  })
  return (
    <div className={classes.Bounder}>
      <LeftDrawer />
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill containerModule={modules[window.fillContainerID] as ContainerModule}/>
      </div>
      <RightDrawer />
    </div>
  )
}

export default App
