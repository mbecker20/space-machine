import React, { Fragment } from 'react'

interface AudioTag {
  id: string
  
}

interface AudioTags {
  [index: string]: AudioTag
}

declare global {
  interface Window {
    audioTags: AudioTags
    addAudioTag: (id: string) => void
  }
}

function AudioTags() {
  return (
    <Fragment>
      
    </Fragment>
  )
}

export default AudioTags