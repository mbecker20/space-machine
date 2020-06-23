import React from 'react'
import useJSS from './style'
import { Drawer, ModuleViewFill } from '../components/all'

function App() {
  const classes = useJSS()
  return (
    <div className={classes.Bounder}>
      <Drawer />
      <ModuleViewFill />
    </div>
  )
}

export default App
