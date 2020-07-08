import { OscillatorModule } from './modules/oscillator'
import { GainModule } from './modules/gain'
import { OutputModule } from './modules/output'
import { AutoFilterModule } from './modules/autoFilter'
import { KompressorModule } from './modules/kompressor'
import { StereoPannerModule } from './modules/stereoPanner'
import { SignalDelayModule } from './modules/signalDelay'

// module type

export const CONTAINER = 'CONTAINER'
export const GAIN = 'GAIN'
export const OSCILLATOR = 'OSCILLATOR'
export const OUTPUT = 'OUTPUT'
export const AUTOFILTER = 'AUTOFILTER'
export const KOMPRESSOR = 'KOMPRESSOR'
export const STEREO_PANNER = 'STEREO_PANNER'
export const SIGNAL_DELAY = 'SIGNAL_DELAY'

export type ModuleType = 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT' | 'GAIN' | 'AUTOFILTER' | 'KOMPRESSOR' | 'STEREO_PANNER' | 'SIGNAL_DELAY'

export type AudioModuleWithTypes = OscillatorModule | AutoFilterModule

export type ConnectingAudioModule = OscillatorModule | GainModule | AutoFilterModule | KompressorModule | StereoPannerModule | SignalDelayModule

export type AudioModule = ConnectingAudioModule | OutputModule

export interface AudioModules {
  [index: string]: AudioModule
}

// control type

export const TYPE = 'TYPE'
export const VALUE = 'VALUE'
export const BUTTON = 'BUTTON'

export type ControlType = 'TYPE' | 'VALUE' | 'BUTTON'
type Value = number
type SetFunc = (arg: string) => void
type Range = [number, number, number?] // min / max / step

export interface ControlDataPacket {
  controlType: ControlType
  paramID?: string
  value?: Value
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
  controlSetFuncs: 
}


