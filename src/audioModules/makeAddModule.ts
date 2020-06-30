import { ModuleType, OSCILLATOR, GATE, OUTPUT } from './moduleTypes'
import { makeOscillator, makeGate } from './all'
import makeOutput from './output';

function makeAddModule() {
  return function(id: string, moduleType: ModuleType) {
    switch(moduleType) {
      case OSCILLATOR: window.audioModules = { ...window.audioModules, [id]: makeOscillator() }; break
      case GATE: window.audioModules = { ...window.audioModules, [id]: makeGate() }; break 
      case OUTPUT: window.audioModules = { ...window.audioModules, [id]: makeOutput() }; break
    }
    console.log('module added (in makeAddModule)')
    console.log(window.audioModules)
  }
}

export default makeAddModule