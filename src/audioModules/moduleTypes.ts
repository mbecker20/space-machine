import { OscillatorModule } from './oscillator'
import { GateModule } from './gate'

export const GATE = 'GATE'
export const OSCILLATOR = 'OSCILLATOR'
export const CONTAINER = 'CONTAINER'
export const OUTPUT = 'OUTPUT'

export type ModuleType = 'GATE' | 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT'

export type AudioModule = OscillatorModule | GateModule

export interface AudioModules {
  [index: string]: AudioModule
}