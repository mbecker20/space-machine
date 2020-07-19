import { ModuleType, OSCILLATOR, OUTPUT, GAIN, AUTOFILTER, KOMPRESSOR, STEREO_PANNER, SIGNAL_DELAY, CONSTANT, MEDIA_ELEMENT, LINE_IN } from './moduleTypes'
import { makeOscillator, makeOutput, makeGain, makeAutoFilter, makeKompressor, makeStereoPanner, makeSignalDelay, makeConstantSource, makeLineInput } from './all'

function makeAddModule() {
  return function(id: string, moduleType: ModuleType) {
    switch(moduleType) {
      case OSCILLATOR: window.audioModules = { ...window.audioModules, [id]: makeOscillator() }; break
      case GAIN: window.audioModules = { ...window.audioModules, [id]: makeGain() }; break
      case OUTPUT: window.audioModules = { ...window.audioModules, [id]: makeOutput() }; break
      case AUTOFILTER: window.audioModules = { ...window.audioModules, [id]: makeAutoFilter() }; break
      case KOMPRESSOR: window.audioModules = { ...window.audioModules, [id]: makeKompressor() }; break
      case STEREO_PANNER: window.audioModules = { ...window.audioModules, [id]: makeStereoPanner() }; break
      case SIGNAL_DELAY: window.audioModules = { ...window.audioModules, [id]: makeSignalDelay() }; break
      case CONSTANT: window.audioModules = { ...window.audioModules, [id]: makeConstantSource() }; break
      case MEDIA_ELEMENT: window.addAudioTag(id); window.reRenderAudioTags(); break
      case LINE_IN: makeLineInput(id); break
    }
  }
}

export default makeAddModule