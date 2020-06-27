import React from 'react'
import useJSS from './style'
import { RightDrawer, LeftDrawer, ModuleViewFill } from '../components/all'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/stateTSTypes'

declare global {
  interface Window { 
    fillContainerID: string
  }
}

window.highlightedID = 'project' // delete this, for dev
window.fillContainerID = 'project'

function App() {
  const classes = useJSS()
  const containerModules = useSelector((state: RootState) => {
    return state.containerModules
  })
  return (
    <div className={classes.Bounder}>
      <LeftDrawer />
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill mod={containerModules[window.fillContainerID]}/>
      </div>
      <RightDrawer />
    </div>
  )
}

export default App
