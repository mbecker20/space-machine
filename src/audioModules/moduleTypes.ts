import { OscillatorModule } from './modules/oscillator'
import { GainModule } from './modules/gain'
import { OutputModule } from './modules/output'
import { AutoFilterModule } from './modules/autoFilter'
import { KompressorModule } from './modules/kompressor'
import { StereoPannerModule } from './modules/stereoPanner'
import { SignalDelayModule } from './modules/signalDelay'
import { ConstantModule } from './modules/constant'
import { MediaElementModule } from './modules/mediaElement'
import { LineInputModule } from './modules/lineInput'

// module types

export const CONTAINER = 'CONTAINER'
export const GAIN = 'GAIN'
export const OSCILLATOR = 'OSCILLATOR'
export const OUTPUT = 'OUTPUT'
export const AUTOFILTER = 'AUTOFILTER'
export const KOMPRESSOR = 'KOMPRESSOR'
export const STEREO_PANNER = 'STEREO_PANNER'
export const SIGNAL_DELAY = 'SIGNAL_DELAY'
export const CONSTANT = 'CONSTANT'
export const MEDIA_ELEMENT = 'MEDIA_ELEMENT'
export const LINE_IN = 'LINE_IN'

export type ModuleType = 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT' | 'GAIN' | 'AUTOFILTER' | 'KOMPRESSOR' | 'STEREO_PANNER' | 'SIGNAL_DELAY' | 'CONSTANT' | 'MEDIA_ELEMENT' | 'LINE_IN'

export type AudioModuleWithTypes = OscillatorModule | AutoFilterModule

export type ConnectingAudioModule = OscillatorModule | GainModule | AutoFilterModule | KompressorModule | StereoPannerModule | SignalDelayModule | ConstantModule | MediaElementModule | LineInputModule

export type AudioModule = ConnectingAudioModule | OutputModule

export interface AudioModules {
  [index: string]: AudioModule
}

// control types

export const TYPE = 'TYPE'
export const VALUE = 'VALUE'
export const BUTTON = 'BUTTON'
export const FILE = 'FILE'
export const INFO = 'INFO'
export const SWITCH = 'SWITCH'

export type ControlType = 'TYPE' | 'VALUE' | 'BUTTON' | 'FILE' | 'INFO' | 'SWITCH'
export type Value = number | string | boolean
export type SetFunc = (arg: string) => void
export type Range = [number, number, number?] // min / max / step

export interface ControlDataPacket {
  controlType: ControlType
  paramID: string
  value?: Value // need either paramID or value
  range?: Range
}

export interface ControlData {
  [name: string]: ControlDataPacket
}

export interface ControlSetFuncs {
  [name: string]: SetFunc
}

export interface BaseAM {
  connectingParamIDs: string[]
  controlData: ControlData
  controlSetFuncs: ControlSetFuncs
}


