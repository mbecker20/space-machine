import { colors } from './theme'
import { LINE_IN, OSCILLATOR, MEDIA_ELEMENT, CONSTANT, AUTOFILTER, GAIN, KOMPRESSOR, SIGNAL_DELAY, STEREO_PANNER, CONTAINER, OUTPUT } from '../audioModules/moduleTypes'

function getModuleColor(moduleType: string) {

  switch (moduleType) {

    // sources
    case LINE_IN: return colors.sourceModuleBG 
    case OSCILLATOR: return colors.sourceModuleBG 
    case MEDIA_ELEMENT: return colors.sourceModuleBG 
    case CONSTANT: return colors.sourceModuleBG 

    // effects 
    case GAIN: return colors.effectsModuleBG
    case AUTOFILTER: return colors.effectsModuleBG
    case KOMPRESSOR: return colors.effectsModuleBG
    case SIGNAL_DELAY: return colors.effectsModuleBG
    case STEREO_PANNER: return colors.effectsModuleBG

    // utility
    case CONTAINER: return colors.containerModuleBG
    case OUTPUT: return colors.outputModuleBG
  }
}

export default getModuleColor 