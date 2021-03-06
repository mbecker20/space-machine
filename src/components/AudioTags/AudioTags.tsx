import React, { Fragment, useState } from 'react'
import AudioTag from './AudioTag'

interface AudioTag {
  id: string
  srcName: string
  ref?: React.RefObject<HTMLAudioElement>
}

interface AudioTags {
  [id: string]: AudioTag
}

declare global {
  interface Window {
    audioTags: AudioTags
    addAudioTag: (id: string) => void
    reRenderAudioTags: () => void
    numberRestores: number
  }
}

window.addAudioTag = (id: string) => {
  window.audioTags[id] = {
    id: id,
    srcName: ''
  }
}

window.audioTags = {}
window.numberRestores = 0

function AudioTags() {
  const [reRender, toReRender] = useState(false)
  window.reRenderAudioTags = () => { toReRender(!reRender) }
  const ids = Object.keys(window.audioTags)
  return (
    <Fragment>
      {ids.map((id) => {
        return (
          <AudioTag
            key={id + window.numberRestores}
            id={id}
          />
        )
      })}
    </Fragment>
  )
}

export default AudioTags