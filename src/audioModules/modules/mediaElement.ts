import audioCtx from "../../audioCtx"
import { RefObject } from 'react'
import { BaseAM, ControlSetFuncs, FILE, BUTTON, ControlData } from "../moduleTypes"

export interface MediaElementModule extends BaseAM {
  audioNode: MediaElementAudioSourceNode
  ref: RefObject<HTMLAudioElement>
}

export function makeMediaElementControlData(): ControlData {
  return {
    'choose file': {
      controlType: FILE,
    },
    'play': {
      controlType: BUTTON,
    },
    'pause': {
      controlType: BUTTON,
    }
  }
}

function makeMediaElement(audioRef: RefObject<HTMLAudioElement>): MediaElementModule | null {
  if (audioRef.current) {
    const mediaElement = audioCtx.createMediaElementSource(audioRef.current)

    const controlSetFuncs: ControlSetFuncs = {
      'choose file': (url: string) => {
        (audioRef.current as HTMLAudioElement).src = url
      },
      'pause': () => {
        (audioRef.current as HTMLAudioElement).pause()
      },
      'play': () => {
        (audioRef.current as HTMLAudioElement).play()
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