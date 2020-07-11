import React, { useRef } from 'react'
import { makeMediaElement } from '../../audioModules/all'

interface Props {
  id: string
}

function AudioTag({ id }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  if (!window.audioModules[id]) {
    window.setTimeout(() => {
      window.audioModules = { ...window.audioModules, [id]: makeMediaElement(audioRef) }
    }, 2000)
  }
  return (
    <audio
      ref={audioRef}
      src={window.audioTags[id].src}
    />
  )
}

export default AudioTag