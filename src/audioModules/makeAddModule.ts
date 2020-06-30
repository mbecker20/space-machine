import { ModuleType, OSCILLATOR, GATE } from './moduleTypes'
import { makeOscillator, makeGate } from './all'

function makeAddModule() {
  return function(id: string, moduleType: ModuleType) {
    switch(moduleType) {
      case OSCILLATOR: window.audioModules = { ...window.audioModules, [id]: makeOscillator() }; break
      case GATE: window.audioModules = { ...window.audioModules, [id]: makeGate() }; break 
    }
  }
}

export default makeAddModule