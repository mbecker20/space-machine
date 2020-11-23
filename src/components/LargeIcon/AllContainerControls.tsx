import React, { Fragment } from 'react'
import { ContainerModule, RootState } from '../../redux/stateTSTypes'
import { TYPE, BUTTON, VALUE, FILE, SWITCH, GRAPH, PAD, TUNER_CONTROL, VISUALIZER_CONTROL } from '../../audioModules/moduleTypes'
import { useSelector } from 'react-redux'
import useJSS from './style'
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
  selectedModule: ContainerModule
  reRender: () => void
}

function AllContainerControls({ selectedModule, reRender }: Props) {
  const modules = useSelector((state: RootState) => state.modules)
  const classes = useJSS()
  return (
    <Fragment>
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
            <FileControl controlID={controlID} setFunc={setFunc} reRenderIcon={reRender} modName={modName} actualModID={actualModID} label={name}/>
            :
            controlType === SWITCH
            ?
            <SwitchControl controlID={controlID} setFunc={setFunc} actualModID={actualModID} modName={modName} label={name}/>
            :
            controlType === GRAPH
            ?
            <GraphControl modID={actualModID} />
            :
            controlType === PAD
            ?
            <PadControl setFunc={setFunc} />
            :
            controlType === TUNER_CONTROL
            ?
            <TunerControl modID={actualModID} />
            :
            controlType === VISUALIZER_CONTROL
            ?
            <VisualizerControl modID={actualModID} />
            :
            null
            }
          </div>
        )
      })}
    </Fragment>
  )
}

export default AllContainerControls