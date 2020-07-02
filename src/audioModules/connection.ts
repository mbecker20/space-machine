import { ConnectingAudioModule, AudioModule } from "./moduleTypes";

export function connect(fromMod: ConnectingAudioModule, toMod: AudioModule, param = '') {
  if (param.length === 0) {
    fromMod.audioNode.connect(toMod.audioNode)
    console.log(`connected ${fromMod.audioNode} to ${toMod.audioNode}`)
  } else {
    if (toMod.audioNode[param]) {
      fromMod.audioNode.connect(toMod.audioNode[param])
    } else {
      alert('param does not exist')
    }
  }
}

export function disconnect(fromMod: ConnectingAudioModule, toMod: AudioModule, param = '') {
  if (param.length === 0) {
    fromMod.audioNode.disconnect(toMod.audioNode)
  } else {
    if (toMod.audioNode[param]) {
      fromMod.audioNode.disconnect(toMod.audioNode[param])
    } else {
      alert('param does not exist')
    }
  }
}