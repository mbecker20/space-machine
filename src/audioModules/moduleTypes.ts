import { OscillatorModule } from './modules/oscillator'
import { GateModule } from './modules/gate'
import { GainModule } from './modules/gain'
import { OutputModule } from './modules/output'
import { AutoFilterModule } from './modules/autoFilter'

export const GATE = 'GATE'
export const GAIN = 'GAIN'
export const OSCILLATOR = 'OSCILLATOR'
export const CONTAINER = 'CONTAINER'
export const OUTPUT = 'OUTPUT'
export const AUTOFILTER = 'AUTOFILTER'

export type ModuleType = 'GATE' | 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT' | 'GAIN' | 'AUTOFILTER'

export type ConnectingAudioModule = OscillatorModule | GateModule | GainModule | AutoFilterModule

export type AudioModule = ConnectingAudioModule | OutputModule

export interface AudioModules {
  [index: string]: AudioModule
}

export interface BaseAM {
  paramIDs: string[]
}