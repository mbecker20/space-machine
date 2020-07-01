import { OscillatorModule } from './oscillator'
import { GateModule } from './gate'
import { GainModule } from './gain'
import { OutputModule } from './output'

export const GATE = 'GATE'
export const GAIN = 'GAIN'
export const OSCILLATOR = 'OSCILLATOR'
export const CONTAINER = 'CONTAINER'
export const OUTPUT = 'OUTPUT'

export type ModuleType = 'GATE' | 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT' | 'GAIN'

export type ConnectingAudioModule = OscillatorModule | GateModule | GainModule

export type AudioModule = ConnectingAudioModule | OutputModule

export interface AudioModules {
  [index: string]: AudioModule
}