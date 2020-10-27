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
  DISTORTION,
  ANALYZER,
  ENVELOPED_TRIGGER,
  WHITE_NOISE,
  TUNER,
} from './moduleTypes'
import makeConstantSource from './modules/constant'
import makeAutoFilter from './modules/autoFilter'
import makeOutput from './modules/output'
import makeStereoPanner from './modules/stereoPanner'
import makeSignalDelay from './modules/signalDelay'
import makeKompressor from './modules/kompressor'
import makeGain from './modules/gain'
import makeOscillator from './modules/oscillator'
import makeLineInput from './modules/lineInput'
import makeContainer from './modules/container'
import makeDistortion from './modules/distortion'
import makeAnalyzer from './modules/analyzer'
import makeEnvelopedTrigger from './modules/envelopedTrigger'
import makeWhiteNoise from './modules/whiteNoise'
import makeTuner from './modules/tuner'


function restoreAudioModule(id: string, moduleType: ModuleType, prevControlData: ControlData) {
  switch (moduleType) {
    case OSCILLATOR:
      const osc = makeOscillator(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: osc }
      break
    case GAIN:
      const gain = makeGain(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: gain }
      break
    case OUTPUT:
      const output = makeOutput(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: output }
      break
    case AUTOFILTER:
      const filter = makeAutoFilter(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: filter }
      break
    case KOMPRESSOR:
      const komp = makeKompressor(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: komp }
      break
    case STEREO_PANNER:
      const panner = makeStereoPanner(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: panner }
      break;
    case SIGNAL_DELAY:
      const delay = makeSignalDelay(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: delay }
      break
    case CONSTANT:
      const constant = makeConstantSource(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: constant }
      break
    case MEDIA_ELEMENT:
      window.addAudioTag(id); window.reRenderAudioTags();
      break;
    case LINE_IN:
      makeLineInput(id)
      break;
    case CONTAINER:
      const container = makeContainer(id)
      window.audioModules = { ...window.audioModules, [id]: container };
      break
    case DISTORTION:
      const distortion = makeDistortion(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: distortion }
      break
    case ANALYZER:
      const analyzer = makeAnalyzer(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: analyzer }
      break
    case ENVELOPED_TRIGGER:
      const envelopedTrigger = makeEnvelopedTrigger(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: envelopedTrigger }
      break
    case WHITE_NOISE:
      const whiteNoise = makeWhiteNoise(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: whiteNoise }
      break
    case TUNER:
      const tuner = makeTuner(prevControlData)
      window.audioModules = { ...window.audioModules, [id]: tuner }
      break
  }
}


export default restoreAudioModule