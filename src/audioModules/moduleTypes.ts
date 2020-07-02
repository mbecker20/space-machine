import { OscillatorModule } from './oscillator'
import { GateModule } from './gate'
import { GainModule } from './gain'
import { OutputModule } from './output'
import { AutoFilterModule } from './autoFilter'

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

export interface Controls {
  allIDs: string[]
}