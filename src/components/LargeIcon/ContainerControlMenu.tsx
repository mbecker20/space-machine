import React from 'react'
import useJSS from './style'
import { AudioModuleWithTypes } from '../../audioModules/moduleTypes'
import { ContainerModule, RootState } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl } from './controls/all'
import { getActualModID } from './helpers'
import { useSelector } from 'react-redux'

interface Props {
  selectedModule: ContainerModule
  reRenderIcon: () => void
}

function ContainerControlMenu({ selectedModule, reRenderIcon }: Props) {
  const classes = useJSS()
  const modules = useSelector((state: RootState) => state.modules)
  return (
    <div className={classes.ControlMenu}>
      {selectedModule.containerControls.map(({ modID, controlID }, index) => {
        const audioModule = window.audioModules[modID]
        const { controlType, value, range } = audioModule.controlData[controlID]
        const setFunc = audioModule.controlSetFuncs[controlID]
        const actualModID = getActualModID(modules)
        return (
          <div className={classes.ControlBounder} key={selectedModule.id + index}>
            {
            controlType === VALUE
            ?
            <ValueControl controlID={controlID} value={value} range={range as [number, number]} setFunc={setFunc} actualModID={modID} displayModID={modID}/>
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
      })}
    </div>
  )
}

export default ContainerControlMenu