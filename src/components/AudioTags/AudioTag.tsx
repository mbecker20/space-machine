import React, { useRef, useEffect } from 'react'
import { makeMediaElement } from '../../audioModules/all'

interface Props {
  id: string
}

function AudioTag({ id }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!window.audioModules[id]) {
      const possiblyMediaElement = makeMediaElement(audioRef)
      if (possiblyMediaElement) {
        window.audioModules = { ...window.audioModules, [id]: possiblyMediaElement }
      }
    }
  })
  return (
    <audio
      ref={audioRef}
      autoPlay
    />
  )
}

export default AudioTag