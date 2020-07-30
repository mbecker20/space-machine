import React from 'react'
import useJSS from './style'
import { AudioModuleWithTypes } from '../../audioModules/moduleTypes'
import { ContainerModule } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl } from './controls/all'

interface Props {
  selectedModule: ContainerModule
  reRenderIcon: () => void
}

function ContainerControlMenu({ selectedModule, reRenderIcon }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ControlMenu}>
      {selectedModule.containerControls.map(({ modID, controlID, actualModID }, index) => {
        const audioModule = window.audioModules[actualModID]
        const { controlType, value, range } = audioModule.controlData[controlID]
        const setFunc = audioModule.controlSetFuncs[controlID]
        return (
          <div className={classes.ControlBounder} key={selectedModule.id + index}>
            {
            controlType === VALUE
            ?
            <ValueControl controlID={controlID} value={value} range={range as [number, number]} setFunc={setFunc} actualModID={actualModID} displayModID={modID}/>
            :
            controlType === BUTTON
            ?
            <ButtonControl setFunc={setFunc} controlID={controlID} modID={modID} />
            :
            controlType === TYPE
            ?
            <TypeControl setFunc={setFunc} audioModule={audioModule as AudioModuleWithTypes} value={value} selectedModule={selectedModule} reRenderIcon={reRenderIcon} modID={modID}/>
            :
            controlType === FILE
            ?
            <FileControl controlID={controlID} setFunc={setFunc} reRenderIcon={reRenderIcon} modID={modID}/>
            :
            controlType === SWITCH
            ?
            <SwitchControl controlID={controlID} setFunc={setFunc} modID={modID} />
            :
            null
            }
          </div>
        )
      })}
    </div>
  )
}

export default ContainerControlMenu