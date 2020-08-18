import React from 'react'
import useJSS from './style'
import { ContainerModule, RootState } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH, GRAPH } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl, GraphControl } from './controls/all'
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
      {selectedModule.containerControls.map(({ modID, controlID, actualModID, name }, index) => {
        const audioModule = window.audioModules[actualModID]
        const { controlType } = modules[actualModID].controlData[controlID]
        const setFunc = audioModule.controlSetFuncs[controlID]
        const modName = modules[modID].name
        return (
          <div className={classes.ControlBounder} key={modID + controlID + index}>
            {
            controlType === VALUE
            ?
            <ValueControl controlID={controlID} setFunc={setFunc} actualModID={actualModID} displayModName={modName} label={name}/>
            :
            controlType === BUTTON
            ?
            <ButtonControl setFunc={setFunc} controlID={controlID} modName={modName} label={name}/>
            :
            controlType === TYPE
            ?
            <TypeControl setFunc={setFunc} controlID={controlID} actualModID={actualModID} modName={modName} label={name}/>
            :
            controlType === FILE
            ?
            <FileControl controlID={controlID} setFunc={setFunc} reRenderIcon={reRenderIcon} modName={modName} actualModID={actualModID} label={name}/>
            :
            controlType === SWITCH
            ?
            <SwitchControl controlID={controlID} setFunc={setFunc} actualModID={actualModID} modName={modName} label={name}/>
            :
            controlType === GRAPH
            ?
            <GraphControl modID={actualModID} />
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