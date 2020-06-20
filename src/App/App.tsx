import React from 'react'
import useJSS from './style'
import { Drawer, ModuleViewFill } from '../components/all'
import makeState from '../state/makeState'

const state = makeState()

function App() {
  const classes = useJSS()
  return (
    <div className={classes.Bounder}>
      <Drawer />
      <ModuleViewFill mod={state.baseModule} />
    </div>
  )
}

export default App
