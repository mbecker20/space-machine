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
  ControlData,
  ControlType,
  FILE,
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
import { makeConstantControlData } from './modules/constant'
import { makeFilterControlData } from './modules/autoFilter'
import { makeOutputControlData } from './modules/output'

function makeAddModule() {
  return function(id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) {
    switch(moduleType) {
      case OSCILLATOR:
        const [ osc, oscControlData ] = makeOscillator();
        window.audioModules = { ...window.audioModules, [id]: osc };
        dispatch(addModule(id, name, moduleType, oscControlData, parentID, row, col, [], ['0']));
        break;
      case GAIN:
        const [ gain, gainControlData ] = makeGain()
        window.audioModules = { ...window.audioModules, [id]: gain }; 
        dispatch(addModule(id, name, moduleType, gainControlData, parentID, row, col, ['0'], ['0'])); 
        break;
      case OUTPUT:
        const output = makeOutput()
        const outputControlData = makeOutputControlData()
        window.audioModules = { ...window.audioModules, [id]: output }
        dispatch(addModule(id, name, moduleType, outputControlData, parentID, row, col, ['0'], []))
        break
      case AUTOFILTER: 
        const filter = makeAutoFilter()
        const filterControlData = makeFilterControlData(filter.audioNode)
        window.audioModules = { ...window.audioModules, [id]: filter }
        dispatch(addModule(id, name, moduleType, filterControlData, parentID, row, col, ['0'], ['0']))
        break
      case KOMPRESSOR:
        const [ komp, kompControlData ] = makeKompressor()
        window.audioModules = { ...window.audioModules, [id]: komp }; 
        dispatch(addModule(id, name, moduleType, kompControlData, parentID, row, col, ['0'], ['0'])); 
        break;
      case STEREO_PANNER:
        const [ panner, pannerControlData ] = makeStereoPanner()
        window.audioModules = { ...window.audioModules, [id]: panner }; 
        dispatch(addModule(id, name, moduleType, pannerControlData, parentID, row, col, ['0'], ['0'])); 
        break;
      case SIGNAL_DELAY:
        const [ delay, delayControlData ] = makeSignalDelay()
        window.audioModules = { ...window.audioModules, [id]: delay }; 
        dispatch(addModule(id, name, moduleType, delayControlData, parentID, row, col, ['0'], ['0'])); 
        break;
      case CONSTANT:
        const constant = makeConstantSource()
        const constantControlData = makeConstantControlData()
        window.audioModules = { ...window.audioModules, [id]: constant }; 
        dispatch(addModule(id, name, moduleType, constantControlData, parentID, row, col, [], ['0'])); 
        break;
      case MEDIA_ELEMENT:
        const mediaControlData: ControlData = {
          'choose file': {
            controlType: FILE as ControlType,
            paramID: 'n/a'
          }
        }
        window.addAudioTag(id); window.reRenderAudioTags(); 
        dispatch(addModule(id, name, moduleType, mediaControlData, parentID, row, col, [], ['0'])); 
        break;
      case LINE_IN: 
        const lineInControlData = makeLineInput(id); 
        dispatch(addModule(id, name, moduleType, lineInControlData, parentID, row, col, [], ['0 (L)', '1 (R)'])); 
        break;
      case CONTAINER: 
        const [ container, containerControlData ] = makeContainer(id)
        window.audioModules = { ...window.audioModules, [id]: container }; 
        dispatch(addModule(id, name, moduleType, containerControlData, parentID, row, col, [], [])); 
        break;
    }
  }
}

export default makeAddModule