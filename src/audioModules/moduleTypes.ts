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
import { ContainerModule } from './modules/container'
import { DistortionModule } from './modules/distortion'
import { AnalyzerModule } from './modules/analyzer'

// module types

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
export const CONTAINER = 'CONTAINER'
export const DISTORTION = 'DISTORTION'
export const ANALYZER = 'ANALYZER'

export type ModuleType = 'OSCILLATOR' | 'CONTAINER' | 'OUTPUT' | 'GAIN' | 'AUTOFILTER' | 'KOMPRESSOR' | 'STEREO_PANNER' | 'SIGNAL_DELAY' | 'CONSTANT' | 'MEDIA_ELEMENT' | 'LINE_IN' | 'DISTORTION' | 'ANALYZER'

export type AudioModuleWithTypes = OscillatorModule | AutoFilterModule

export type ConnectingAudioModule = OscillatorModule | GainModule | AutoFilterModule | KompressorModule | StereoPannerModule | SignalDelayModule | ConstantModule | MediaElementModule | LineInputModule | OutputModule | DistortionModule | AnalyzerModule

export type AudioModule = ConnectingAudioModule | ContainerModule

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
export const GRAPH = 'GRAPH'

export type ControlType = 'TYPE' | 'VALUE' | 'BUTTON' | 'FILE' | 'INFO' | 'SWITCH' | 'GRAPH'
export type Value = number | string | boolean
export type SetFunc = (arg: string) => void
export type Range = [number, number] // min / max

export interface ControlDataPacket {
  controlType: ControlType
  paramID?: string
  value?: Value // need either paramID or value
  range?: Range
  maxRange?: Range // the max the range can be set to be
  markedToContainer?: boolean
}

export interface ControlData {
  [controlID: string]: ControlDataPacket
}

export interface ControlSetFuncs {
  [controlID: string]: SetFunc
}

export interface BaseAM {
  connectingParamIDs: string[]
  controlSetFuncs: ControlSetFuncs
}


