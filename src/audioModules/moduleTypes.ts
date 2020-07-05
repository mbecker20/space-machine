import { OscillatorModule } from './modules/oscillator'
import { GainModule } from './modules/gain'
import { OutputModule } from './modules/output'
import { AutoFilterModule } from './modules/autoFilter'
import { KompressorModule } from './modules/kompressor'
import { StereoPannerModule } from './modules/stereoPanner'
import { SignalDelayModule } from './modules/signalDelay'

// module type strings

export const CONTAINER = 'CONTAINER'
export const GAIN = 'GAIN'
export const OSCILLATOR = 'OSCILLATOR'
export const OUTPUT = 'OUTPUT'
export const AUTOFILTER = 'AUTOFILTER'
export const KOMPRESSOR = 'KOMPRESSOR'
export const STEREO_PANNER = 'STEREO_PANNER'
export const SIGNAL_DELAY = 'SIGNAL_DELAY'

export type ModuleType = 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT' | 'GAIN' | 'AUTOFILTER' | 'KOMPRESSOR' | 'STEREO_PANNER' | 'SIGNAL DELAY'

// control type strings

export const TYPE = 'TYPE'
export const VALUE = 'VALUE'
export const BUTTON = 'BUTTON'

export type ControlType = 'TYPE' | 'VALUE' | 'BUTTON'

export type AudioModuleWithTypes = OscillatorModule | AutoFilterModule

export type ConnectingAudioModule = OscillatorModule | GainModule | AutoFilterModule | KompressorModule | StereoPannerModule | SignalDelayModule

export type AudioModule = ConnectingAudioModule | OutputModule

export interface AudioModules {
  [index: string]: AudioModule
}

export interface BaseAM {
  paramIDs: [string, ControlType][]
}

export interface BaseControls {
  [index: string]: (arg: string) => void
}