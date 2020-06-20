import React from 'react'
import useJSS from './style'
import { Drawer, ModuleViewFill, HorizontalScrollDiv } from '../components/all'
import makeState from '../state/makeState'

const state = makeState()

function App() {
  const classes = useJSS()
  return (
    <div className={classes.Bounder}>
      <Drawer />
      <ModuleViewFill module={state.baseModule}/>
    </div>
  )
}

export default App
