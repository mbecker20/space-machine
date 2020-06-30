import { OscillatorModule } from './oscillator'

export const GATE = 'GATE'
export const OSCILLATOR = 'OSCILLATOR'
export const CONTAINER = 'CONTAINER'
export const OUTPUT = 'OUTPUT'

export type ModuleType = 'GATE' | 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT'

export type AudioModule = OscillatorModule

export interface AudioModules {
  [index: string]: AudioModule
}