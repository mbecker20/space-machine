import { OscillatorModule } from './oscillator'
import { GateModule } from './gate'
import { OutputModule } from './output'

export const GATE = 'GATE'
export const OSCILLATOR = 'OSCILLATOR'
export const CONTAINER = 'CONTAINER'
export const OUTPUT = 'OUTPUT'

export type ModuleType = 'GATE' | 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT'

export type ConnectingAudioModule = OscillatorModule | GateModule

export type AudioModule = ConnectingAudioModule | OutputModule

export interface AudioModules {
  [index: string]: AudioModule
}