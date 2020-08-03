import React, { useRef, useEffect } from 'react'
import makeMediaElement from '../../audioModules/modules/mediaElement'

interface Props {
  id: string
}

function AudioTag({ id }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!window.audioModules[id]) {
      console.log(audioRef)
      const possiblyMediaElement = makeMediaElement(audioRef)
      if (possiblyMediaElement) {
        window.audioModules = { ...window.audioModules, [id]: possiblyMediaElement }
        console.log(possiblyMediaElement)
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