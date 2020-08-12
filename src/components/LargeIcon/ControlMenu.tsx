import React from 'react'
import useJSS from './style'
import { AudioModule, GRAPH } from '../../audioModules/moduleTypes'
import { Module } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import { FileControl, TypeControl, ValueControl, ButtonControl, SwitchControl, GraphControl } from './controls/all'

interface Props {
  audioModule: AudioModule
  selectedModule: Module
  reRenderIcon: () => void
}

function ControlMenu({ audioModule, selectedModule, reRenderIcon }: Props) {
  const classes = useJSS()
  return (
    <div className={classes.ControlMenu}>
      {Object.keys(selectedModule.controlData).map((controlID, index) => {
        const { controlType } = selectedModule.controlData[controlID]
        const setFunc = audioModule.controlSetFuncs[controlID]
        return (
          <div className={classes.ControlBounder} key={selectedModule.id + controlID + index}>
            {controlType === VALUE
            ?
            <ValueControl controlID={controlID} setFunc={setFunc} actualModID={selectedModule.id}/>
            :
            controlType === BUTTON
            ?
            <ButtonControl setFunc={setFunc} controlID={controlID} />
            :
            controlType === TYPE
            ?
            <TypeControl setFunc={setFunc} controlID={controlID} actualModID={selectedModule.id} />
            :
            controlType === FILE
            ?
            <FileControl controlID={controlID} setFunc={setFunc} reRenderIcon={reRenderIcon} actualModID={selectedModule.id}/>
            :
            controlType === SWITCH
            ?
            <SwitchControl controlID={controlID} setFunc={setFunc} actualModID={selectedModule.id} />
            :
            controlType === GRAPH
            ?
            <GraphControl modID={selectedModule.id} setFunc={setFunc} />
            :
            null
            }
          </div>
        )
      })}
    </div>
  )
}

export default ControlMenu