import { ModuleType, OSCILLATOR, OUTPUT, GAIN, AUTOFILTER } from './moduleTypes'
import { makeOscillator, makeOutput, makeGain, makeAutoFilter } from './all'

function makeAddModule() {
  return function(id: string, moduleType: ModuleType) {
    switch(moduleType) {
      case OSCILLATOR: window.audioModules = { ...window.audioModules, [id]: makeOscillator() }; break
      case GAIN: window.audioModules = { ...window.audioModules, [id]: makeGain() }; break
      case OUTPUT: window.audioModules = { ...window.audioModules, [id]: makeOutput() }; break
      case AUTOFILTER: window.audioModules = { ...window.audioModules, [id]: makeAutoFilter() }; break
    }
  }
}

export default makeAddModule