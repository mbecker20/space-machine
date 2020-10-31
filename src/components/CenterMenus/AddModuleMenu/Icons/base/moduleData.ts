import { GAIN, AUTOFILTER, KOMPRESSOR, SIGNAL_DELAY, STEREO_PANNER, MEDIA_ELEMENT, LINE_IN, OSCILLATOR, CONSTANT, CONTAINER, OUTPUT, DISTORTION, ANALYZER, ENVELOPED_TRIGGER, WHITE_NOISE, TUNER, VISUALIZER } from "../../../../../audioModules/moduleTypes";

export type DrawerModuleData = [string, string, string][]

export const effectModuleData: DrawerModuleData = [
  ['gain', 'gain', GAIN], // fullname, shortname, moduleType
  ['filter', 'filter', AUTOFILTER],
  ['kompressor', 'komp', KOMPRESSOR],
  ['signal delay', 'delay', SIGNAL_DELAY],
  ['stereo panner', 'pan', STEREO_PANNER],
  ['distortion', 'dist', DISTORTION],
]

export const sourceModuleData: DrawerModuleData = [
  ['file', 'file', MEDIA_ELEMENT],
  ['stream', 'stream', LINE_IN],
  ['oscillator', 'osc', OSCILLATOR],
  ['constant', 'const', CONSTANT],
  ['enveloped pad', 'env', ENVELOPED_TRIGGER],
  ['white noise', 'noise', WHITE_NOISE]
]

export const utilityModuleData: DrawerModuleData = [
  ['container', 'cntnr', CONTAINER],
  ['output', 'out', OUTPUT],
  ['analyzer', 'analyzer', ANALYZER],
  ['tuner', 'tuner', TUNER],
  ['visualizer', 'viz', VISUALIZER],
]

export const allModuleData: DrawerModuleData = effectModuleData.concat(sourceModuleData).concat(utilityModuleData)