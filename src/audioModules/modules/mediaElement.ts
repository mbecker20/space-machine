import audioCtx from "../../audioCtx"
import { RefObject } from 'react'
import { BaseAM, ControlSetFuncs } from "../moduleTypes"

export interface MediaElementModule extends BaseAM {
  audioNode: MediaElementAudioSourceNode
  ref: RefObject<HTMLAudioElement>
}

function makeMediaElement(audioRef: RefObject<HTMLAudioElement>): MediaElementModule | null {
  if (audioRef.current) {
    const mediaElement = audioCtx.createMediaElementSource(audioRef.current)

    // control data is in makeAddModules

    const controlSetFuncs: ControlSetFuncs = {
      'choose file': (url: string) => {
        (audioRef.current as HTMLAudioElement).src = url
      }
    }

    return {
      audioNode: mediaElement,
      ref: audioRef,
      connectingParamIDs: [],
      controlSetFuncs,
    }
  } else {
    return null
  }
}

export default makeMediaElement