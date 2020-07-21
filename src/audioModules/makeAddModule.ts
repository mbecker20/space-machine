import { 
  ModuleType, 
  OSCILLATOR, 
  OUTPUT, GAIN, 
  AUTOFILTER, 
  KOMPRESSOR, 
  STEREO_PANNER, 
  SIGNAL_DELAY, 
  CONSTANT, 
  MEDIA_ELEMENT, 
  LINE_IN,
  CONTAINER,
} from './moduleTypes'
import { 
  makeOscillator, 
  makeOutput, makeGain, 
  makeAutoFilter, 
  makeKompressor, 
  makeStereoPanner, 
  makeSignalDelay, 
  makeConstantSource, 
  makeLineInput,
  makeContainer
} from './all'
import { Dispatch } from 'redux'
import { addModule } from '../redux/allActions'

function makeAddModule() {
  return function(id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) {
    switch(moduleType) {
      case OSCILLATOR: window.audioModules = { ...window.audioModules, [id]: makeOscillator() }; dispatch(addModule(id, name, moduleType, parentID, row, col, [], ['0'])); break
      case GAIN: window.audioModules = { ...window.audioModules, [id]: makeGain() }; dispatch(addModule(id, name, moduleType, parentID, row, col, ['0'], ['0'])); break
      case OUTPUT: window.audioModules = { ...window.audioModules, [id]: makeOutput() }; dispatch(addModule(id, name, moduleType, parentID, row, col, ['0'], [])); break
      case AUTOFILTER: window.audioModules = { ...window.audioModules, [id]: makeAutoFilter() }; dispatch(addModule(id, name, moduleType, parentID, row, col, ['0'], ['0'])); break
      case KOMPRESSOR: window.audioModules = { ...window.audioModules, [id]: makeKompressor() }; dispatch(addModule(id, name, moduleType, parentID, row, col, ['0'], ['0'])); break
      case STEREO_PANNER: window.audioModules = { ...window.audioModules, [id]: makeStereoPanner() }; dispatch(addModule(id, name, moduleType, parentID, row, col, ['0'], ['0'])); break
      case SIGNAL_DELAY: window.audioModules = { ...window.audioModules, [id]: makeSignalDelay() }; dispatch(addModule(id, name, moduleType, parentID, row, col, ['0'], ['0'])); break
      case CONSTANT: window.audioModules = { ...window.audioModules, [id]: makeConstantSource() }; dispatch(addModule(id, name, moduleType, parentID, row, col, [], ['0'])); break
      case MEDIA_ELEMENT: window.addAudioTag(id); window.reRenderAudioTags(); dispatch(addModule(id, name, moduleType, parentID, row, col, [], ['0'])); break
      case LINE_IN: makeLineInput(id); dispatch(addModule(id, name, moduleType, parentID, row, col, [], ['0 (L)', '1 (R)'])); break
      case CONTAINER: window.audioModules = { ...window.audioModules, [id]: makeContainer(id) }; dispatch(addModule(id, name, moduleType, parentID, row, col, [], [])); break
    }
  }
}

export default makeAddModule