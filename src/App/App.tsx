import React from 'react'
import useJSS from './style'
import { Drawer, ModuleViewFill } from '../components/all'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/stateTSTypes'

function App() {
  const classes = useJSS()
  const { fillContainerID, containerModules } = useSelector((state: RootState) => {
    return {
      fillContainerID: state.fillContainer.id,
      containerModules: state.containerModules,
    }
  })
  return (
    <div className={classes.Bounder}>
      <Drawer />
      <div className={classes.ModuleViewBounder}>
        <ModuleViewFill mod={containerModules[fillContainerID]}/>
      </div>
    </div>
  )
}

export default App
