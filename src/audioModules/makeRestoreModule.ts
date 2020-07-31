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
import { addModule } from '../redux/allActions'
import { Module } from '../redux/stateTSTypes'

function makeRestoreModule() {
  return function ({ id, moduleType, name, parentID,  }: Module) {
    switch (moduleType) {
      case OSCILLATOR:
        const [osc, oscControlData] = makeOscillator();
        window.audioModules = { ...window.audioModules, [id]: osc };
        break;
      case GAIN:
        const [gain, gainControlData] = makeGain()
        window.audioModules = { ...window.audioModules, [id]: gain };
        break;
      case OUTPUT:
        const [output, outputControlData] = makeOutput()
        window.audioModules = { ...window.audioModules, [id]: output };
        break;
      case AUTOFILTER:
        const [filter, filterControlData] = makeAutoFilter();
        window.audioModules = { ...window.audioModules, [id]: filter };
        break;
      case KOMPRESSOR:
        const [komp, kompControlData] = makeKompressor()
        window.audioModules = { ...window.audioModules, [id]: komp };
        break;
      case STEREO_PANNER:
        const [panner, pannerControlData] = makeStereoPanner()
        window.audioModules = { ...window.audioModules, [id]: panner };
        break;
      case SIGNAL_DELAY:
        const [delay, delayControlData] = makeSignalDelay()
        window.audioModules = { ...window.audioModules, [id]: delay };
        break;
      case CONSTANT:
        const [constant, constantControlData] = makeConstantSource()
        window.audioModules = { ...window.audioModules, [id]: constant };
        break;
      case MEDIA_ELEMENT:
        const mediaControlData: ControlData = {
          'choose file': {
            controlType: FILE as ControlType,
            paramID: 'n/a'
          }
        }
        window.addAudioTag(id); window.reRenderAudioTags();
        break;
      case LINE_IN:
        const lineInControlData = makeLineInput(id);
        break;
      case CONTAINER:
        const [container, containerControlData] = makeContainer(id)
        window.audioModules = { ...window.audioModules, [id]: container };
        break;
    }
  }
}

export default makeRestoreModule