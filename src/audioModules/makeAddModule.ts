import { ModuleType, OSCILLATOR, GATE, OUTPUT, GAIN } from './moduleTypes'
import { makeOscillator, makeGate, makeOutput, makeGain } from './all'

function makeAddModule() {
  return function(id: string, moduleType: ModuleType) {
    switch(moduleType) {
      case OSCILLATOR: window.audioModules = { ...window.audioModules, [id]: makeOscillator() }; break
      case GATE: window.audioModules = { ...window.audioModules, [id]: makeGate() }; break
      case GAIN: window.audioModules = { ...window.audioModules, [id]: makeGain() }; break
      case OUTPUT: window.audioModules = { ...window.audioModules, [id]: makeOutput() }; break
    }
  }
}

export default makeAddModule