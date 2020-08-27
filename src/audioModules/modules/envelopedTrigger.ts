import { BaseAM, ControlData, VALUE, PAD } from "../moduleTypes"
import audioCtx from '../../audioCtx'

export interface EnvelopedTriggerModule extends BaseAM {
  audioNode: ConstantSourceNode
}

export function makeEnvelopedTriggerControlData(): ControlData {
  return {
    'trigger': {
      controlType: PAD,
    },
    'attack': {
      controlType: VALUE,
      value: 0.1,
      range: [0.001, 1],
      maxRange: [0.001, 100],
    },
    'decay': {
      controlType: VALUE,
      value: 0.2,
      range: [0.001, 10],
      maxRange: [0.001, 100],
    },
    'sustain': {
      controlType: VALUE,
      value: 1,
      range: [0, 1],
      maxRange: [0, 100],
    },
    'release': {
      controlType: VALUE,
      value: 0.1,
      range: [0.001, 1],
      maxRange: [0.001, 100],
    },
  }
}

function makeEnvelopedTrigger(prevControlData?: ControlData): EnvelopedTriggerModule {
  const constant = audioCtx.createConstantSource()
  constant.offset.value = 0

  let attack = .1
  let decay = 0.2
  let sustain = 1
  let release = .1

  if (prevControlData) {
    attack = prevControlData['attack'].value as number
    decay = prevControlData['decay'].value as number
    sustain = prevControlData['sustain'].value as number
    release = prevControlData['release'].value as number
  }

  const controlSetFuncs = {
    'trigger': (val: string) => {
      const currTime = audioCtx.currentTime
      if (val === 'on') {
        constant.offset.linearRampToValueAtTime(1, currTime + attack)
        constant.offset.setTargetAtTime(sustain, currTime + attack, decay)
      } else {
        constant.offset.cancelAndHoldAtTime(currTime)
        constant.offset.setTargetAtTime(0, currTime, release)
      }
    },
    'attack': (val: string) => {
      attack = Number(val)
    },
    'decay': (val: string) => {
      decay = Number(val)
    },
    'sustain': (val: string) => {
      sustain = Number(val)
    },
    'release': (val: string) => {
      release = Number(val)
    },
  }

  constant.start()

  return {
    audioNode: constant,
    connectingParamIDs: [],
    controlSetFuncs,
  }
}

export default makeEnvelopedTrigger