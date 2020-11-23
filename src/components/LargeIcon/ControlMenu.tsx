import React from 'react'
import useJSS from './style'
import { AudioModule, GRAPH, PAD, TUNER_CONTROL, VISUALIZER_CONTROL } from '../../audioModules/moduleTypes'
import { Module } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH } from '../../audioModules/moduleTypes'
import PadControl from './controls/Pad'
import ValueControl from './controls/Value'
import ButtonControl from './controls/Button'
import TypeControl from './controls/Type'
import FileControl from './controls/File'
import SwitchControl from './controls/Switch'
import GraphControl from './controls/Graph'
import TunerControl from './controls/Tuner/Tuner'
import VisualizerControl from './controls/Visualizer/Visualizer'

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
            controlType === BUTTON && controlID !== 'open'
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
            <GraphControl modID={selectedModule.id} />
            :
            controlType === PAD
            ?
            <PadControl setFunc={setFunc} />
            :
            controlType === TUNER_CONTROL
            ?
            <TunerControl modID={selectedModule.id} />
            :
            controlType === VISUALIZER_CONTROL
            ?
            <VisualizerControl modID={selectedModule.id} />
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