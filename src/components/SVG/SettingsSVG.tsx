import React from 'react'
import settingsSVG from '../../icons/settings.svg'
import CSS from 'csstype'

interface Props {
  className?: string
  style?: CSS.Properties
  alt: string
}

function SettingsSVG({ className, style, alt }: Props) {
  return (
    <img className={className}
      style={style}
      src={settingsSVG}
      alt={alt}
    />
  )
}

export default SettingsSVG