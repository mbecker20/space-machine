import { colors } from './theme'
import { LINE_IN, OSCILLATOR, MEDIA_ELEMENT, CONSTANT, AUTOFILTER, GAIN, KOMPRESSOR, SIGNAL_DELAY, STEREO_PANNER, CONTAINER, OUTPUT, DISTORTION, ANALYZER, ENVELOPED_TRIGGER } from '../audioModules/moduleTypes'

function getModuleColor(moduleType?: string) {

  switch (moduleType) {

    // sources
    case LINE_IN: return colors.sourceModuleBG 
    case OSCILLATOR: return colors.sourceModuleBG 
    case MEDIA_ELEMENT: return colors.sourceModuleBG 
    case CONSTANT: return colors.sourceModuleBG
    case ENVELOPED_TRIGGER: return colors.sourceModuleBG

    // effects 
    case GAIN: return colors.effectsModuleBG
    case AUTOFILTER: return colors.effectsModuleBG
    case KOMPRESSOR: return colors.effectsModuleBG
    case SIGNAL_DELAY: return colors.effectsModuleBG
    case STEREO_PANNER: return colors.effectsModuleBG
    case DISTORTION: return colors.effectsModuleBG

    // utility
    case CONTAINER: return colors.containerModuleBG
    case OUTPUT: return colors.outputModuleBG
    case ANALYZER: return colors.analyzerModuleBG
  }
}

export default getModuleColor 