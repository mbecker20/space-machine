import React from 'react'
import useJSS from './style'
import { Drawer, ModuleViewFill } from '../components/all'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/stateTSTypes'

function App() {
  const classes = useJSS()
  const { fillContainerID, containerModules } = useSelector((state: RootState) => {
    return {
      fillContainerID: state.fillContainerID,
      containerModules: state.containerModules,
    }
  })
  return (
    <div className={classes.Bounder}>
      <Drawer />
      <ModuleViewFill mod={containerModules[fillContainerID]}/>
    </div>
  )
}

export default App
