import { moduleColors } from './theme'
import { LINE_IN, OSCILLATOR, MEDIA_ELEMENT, CONSTANT, AUTOFILTER, GAIN, KOMPRESSOR, SIGNAL_DELAY, STEREO_PANNER, CONTAINER, OUTPUT } from '../audioModules/moduleTypes'

function getModuleColor(moduleType: string) {

  switch (moduleType) {

    // sources
    case LINE_IN: return moduleColors.source 
    case OSCILLATOR: return moduleColors.source
    case MEDIA_ELEMENT: return moduleColors.source
    case CONSTANT: return moduleColors.source

    // effects 
    case GAIN: return moduleColors.effect
    case AUTOFILTER: return moduleColors.effect
    case KOMPRESSOR: return moduleColors.effect
    case SIGNAL_DELAY: return moduleColors.effect
    case STEREO_PANNER: return moduleColors.effect

    // utility
    case CONTAINER: return moduleColors.utility
    case OUTPUT: return moduleColors.effect
  }
}

export default getModuleColor 