import React, { useState } from 'react'
import useJSS from './style'
import { AudioModule, AudioModuleWithTypes } from '../../audioModules/moduleTypes'
import { Module } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl } from './controls/all'
import { Button } from '../all'
import { colors, sizes } from '../../theme/theme'

interface Props {
  audioModule: AudioModule
  selectedModule: Module
  reRenderIcon: () => void
}

function ControlMenu({ audioModule, selectedModule, reRenderIcon }: Props) {
  const classes = useJSS()
  const [controlsOpen, setControlsOpen] = useState(true)
  return (
    <div className={classes.ControlMenu}>
      <Button style={{
        width: '70%',
        backgroundColor: colors.controlMenuButton,
        fontSize: sizes.text.small,
      }}
        onClick={e => {
          e.stopPropagation()
          setControlsOpen(!controlsOpen)
        }}
      >{'controls'}</Button>
      {!controlsOpen ? null : audioModule ? Object.keys(audioModule.controlData).map((controlID, index) => {
        const { controlType, paramID, value, range } = audioModule.controlData[controlID]
        const setFunc = audioModule.controlSetFuncs[controlID]
        return (
          <div className={classes.ControlBounder} key={selectedModule.id + index}>
            {controlType === VALUE
            ?
            <ValueControl controlID={controlID} value={value} audioModule={audioModule} range={range} paramID={paramID} setFunc={setFunc} reRenderIcon={reRenderIcon} />
            :
            controlType === BUTTON
            ?
            <ButtonControl setFunc={setFunc} controlID={controlID} />
            :
            controlType === TYPE
            ?
            <TypeControl setFunc={setFunc} audioModule={audioModule as AudioModuleWithTypes} value={value} selectedModule={selectedModule} reRenderIcon={reRenderIcon} />
            :
            controlType === FILE
            ?
            <FileControl controlID={controlID} setFunc={setFunc} reRenderIcon={reRenderIcon} />
            :
            controlType === SWITCH
            ?
            <SwitchControl controlID={controlID} setFunc={setFunc} />
            :
            null
            }
          </div>
        )
      }) : null}
    </div>
  )
}

export default ControlMenu