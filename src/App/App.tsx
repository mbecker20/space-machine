import React from 'react'
import useJSS from './style'
import { RightDrawer, LeftDrawer, ModuleViewFill } from '../components/all'
import { useSelector } from 'react-redux'
import { RootState, ContainerModule } from '../redux/stateTSTypes'
import { AudioModules, ModuleType } from '../audioModules/moduleTypes'
import makeAddModule from '../audioModules/makeAddModule'

declare global {
  interface Window { 
    fillContainerID: string
    audioModules: AudioModules
    addModule: (id: string, moduleType: ModuleType) => void
  }
}

window.highlightedID = 'project' // delete this, for dev
window.fillContainerID = 'project'

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
        <ModuleViewFill mod={modules[window.fillContainerID] as ContainerModule}/>
      </div>
      <RightDrawer />
    </div>
  )
}

export default App
