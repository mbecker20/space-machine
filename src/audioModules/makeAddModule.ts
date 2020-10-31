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
  DISTORTION,
  ANALYZER,
  ENVELOPED_TRIGGER,
  WHITE_NOISE,
  TUNER,
  VISUALIZER,
} from './moduleTypes'
import { Dispatch } from 'redux'
import { addModule } from '../redux/allActions'
import makeConstantSource, { makeConstantControlData } from './modules/constant'
import makeAutoFilter, { makeFilterControlData } from './modules/autoFilter'
import makeOutput, { makeOutputControlData } from './modules/output'
import makeStereoPanner, { makePannerControlData } from './modules/stereoPanner'
import makeSignalDelay, { makeDelayControlData } from './modules/signalDelay'
import makeKompressor, { makeKompControlData } from './modules/kompressor'
import makeGain, { makeGainControlData } from './modules/gain'
import makeOscillator, { makeOscControlData } from './modules/oscillator'
import makeLineInput, { makeLineInControlData } from './modules/lineInput'
import makeContainer, { makeContainerControlData } from './modules/container'
import { makeMediaElementControlData } from './modules/mediaElement'
import makeDistortion, { makeDistortionControlData } from './modules/distortion'
import makeAnalyzer, { makeAnalyzerControlData } from './modules/analyzer'
import makeEnvelopedTrigger, { makeEnvelopedTriggerControlData } from './modules/envelopedTrigger'
import makeWhiteNoise, { makeWhiteNoiseControlData } from './modules/whiteNoise'
import makeTuner, { makeTunerControlData } from './modules/tuner'
import makeVisualizer, { makeVisualizerControlData } from './modules/visualizer'

declare global {
  interface Window {
    addModule: (id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) => void
  }
}

function makeAddModule() {
  window.addModule = function(id: string, name: string, parentID: string, moduleType: ModuleType, dispatch: Dispatch, row: number, col: number) {
    switch(moduleType) {
      case OSCILLATOR:
        const osc = makeOscillator()
        const oscControlData = makeOscControlData(osc.audioNode)
        window.audioModules = { ...window.audioModules, [id]: osc };
        dispatch(addModule(id, name, moduleType, oscControlData, parentID, row, col, [], ['0']));
        break;
      case GAIN:
        const gain = makeGain()
        const gainControlData = makeGainControlData()
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
        const komp = makeKompressor()
        const kompControlData = makeKompControlData(komp.audioNode)
        window.audioModules = { ...window.audioModules, [id]: komp }; 
        dispatch(addModule(id, name, moduleType, kompControlData, parentID, row, col, ['0'], ['0'])); 
        break;
      case STEREO_PANNER:
        const panner = makeStereoPanner()
        const pannerControlData = makePannerControlData()
        window.audioModules = { ...window.audioModules, [id]: panner }; 
        dispatch(addModule(id, name, moduleType, pannerControlData, parentID, row, col, ['0'], ['0'])); 
        break;
      case SIGNAL_DELAY:
        const delay = makeSignalDelay()
        const delayControlData = makeDelayControlData()
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
        const mediaControlData = makeMediaElementControlData()
        window.addAudioTag(id); window.reRenderAudioTags()
        dispatch(addModule(id, name, moduleType, mediaControlData, parentID, row, col, [], ['0']))
        break;
      case LINE_IN: 
        makeLineInput(id)
        const lineInControlData = makeLineInControlData()
        dispatch(addModule(id, name, moduleType, lineInControlData, parentID, row, col, [], ['0 (L)', '1 (R)'])); 
        break;
      case CONTAINER: 
        const container = makeContainer(id)
        const containerControlData = makeContainerControlData()
        window.audioModules = { ...window.audioModules, [id]: container }; 
        dispatch(addModule(id, name, moduleType, containerControlData, parentID, row, col, [], [])); 
        break;
      case DISTORTION:
        const distortion = makeDistortion()
        const distortionControlData = makeDistortionControlData()
        window.audioModules = { ...window.audioModules, [id]: distortion }
        dispatch(addModule(id, name, moduleType, distortionControlData, parentID, row, col, ['0'], ['0']))
        break
      case ANALYZER:
        const analyzer = makeAnalyzer()
        const analyzerControlData = makeAnalyzerControlData()
        window.audioModules = { ...window.audioModules, [id]: analyzer }
        dispatch(addModule(id, name, moduleType, analyzerControlData, parentID, row, col, ['0'], ['0']))
        break
      case ENVELOPED_TRIGGER:
        const envelopedTrigger = makeEnvelopedTrigger()
        const envelopedTriggerControlData = makeEnvelopedTriggerControlData()
        window.audioModules = { ...window.audioModules, [id]: envelopedTrigger }
        dispatch(addModule(id, name, moduleType, envelopedTriggerControlData, parentID, row, col, [], ['0']))
        break
      case WHITE_NOISE:
        const whiteNoise = makeWhiteNoise()
        const whiteNoiseControlData = makeWhiteNoiseControlData()
        window.audioModules = { ...window.audioModules, [id]: whiteNoise }
        dispatch(addModule(id, name, moduleType, whiteNoiseControlData, parentID, row, col, [], ['0']))
        break
      case TUNER:
        const tuner = makeTuner()
        const tunerControlData = makeTunerControlData()
        window.audioModules = { ...window.audioModules, [id]: tuner }
        dispatch(addModule(id, name, moduleType, tunerControlData, parentID, row, col, ['0'], ['0']))
        break
      case VISUALIZER:
        const visualizer = makeVisualizer()
        const visualizerControlData = makeVisualizerControlData()
        window.audioModules = { ...window.audioModules, [id]: visualizer }
        dispatch(addModule(id, name, moduleType, visualizerControlData, parentID, row, col, ['0'], ['0']))
        break
    }
  }
}

export default makeAddModule