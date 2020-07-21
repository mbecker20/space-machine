import { ConnectingAudioModule, AudioModule } from "./moduleTypes";

export function connect(fromMod: ConnectingAudioModule, toMod: AudioModule, param = '', outputIndex?: number, inputIndex?: number) {
  if (param.length === 0) {
    fromMod.audioNode.connect(toMod.audioNode, outputIndex, inputIndex)
  } else {
    if (toMod.audioNode[param]) {
      fromMod.audioNode.connect(toMod.audioNode[param], outputIndex)
    } else {
      alert('param does not exist')
    }
  }
}

export function disconnect(fromMod: ConnectingAudioModule, toMod: AudioModule, param = '', outputIndex?: number) {
  if (param.length === 0) {
    if (typeof(outputIndex) === 'number') {
      fromMod.audioNode.disconnect(toMod.audioNode, outputIndex)
    } else {
      fromMod.audioNode.disconnect(toMod.audioNode)
    }
  } else {
    if (toMod.audioNode[param]) {
      if (typeof (outputIndex) === 'number') {
        fromMod.audioNode.disconnect(toMod.audioNode[param], outputIndex)
      } else {
        fromMod.audioNode.disconnect(toMod.audioNode[param])
      }
    } else {
      alert('param does not exist')
    }
  }
}