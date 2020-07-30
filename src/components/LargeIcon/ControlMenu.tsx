import React from 'react'
import useJSS from './style'
import { AudioModule, AudioModuleWithTypes } from '../../audioModules/moduleTypes'
import { Module } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl } from './controls/all'

interface Props {
  audioModule: AudioModule
  selectedModule: Module
  reRenderIcon: () => void
}

function ControlMenu({ audioModule, selectedModule, reRenderIcon }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ControlMenu}>
      {audioModule ? Object.keys(audioModule.controlData).map((controlID, index) => {
        const { controlType, value, range } = audioModule.controlData[controlID]
        const setFunc = audioModule.controlSetFuncs[controlID]
        return (
          <div className={classes.ControlBounder} key={selectedModule.id + index}>
            {controlType === VALUE
            ?
            <ValueControl controlID={controlID} value={value} range={range as [number, number]} setFunc={setFunc} />
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