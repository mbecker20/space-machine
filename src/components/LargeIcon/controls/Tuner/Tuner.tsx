import { Color3, Color4, Mesh, PointLight, TargetCamera, Vector3 } from '@babylonjs/core'
import React from 'react'
import { TunerModule } from '../../../../audioModules/modules/tuner'
import { Range, TUNER } from '../../../../audioModules/moduleTypes'
import { clamp, mapValBetweenRanges } from '../../../../helpers/genFuncs'
import getModuleColor from '../../../../theme/moduleColor'
import { sizes } from '../../../../theme/theme'
import BabylonCanvas from '../../../BabylonCanvas/BabylonCanvas'
import makeDial, { dialRange, diameter, noteFreqRange } from './makeDial'


interface Props {
  modID: string
}

function Tuner({ modID }: Props) {
  let target = -.1
  let frame = 0
  const tuner = window.audioModules[modID] as TunerModule
  return (
    <BabylonCanvas
      onSceneReady={scene => {
        // set background / ambient color
        scene.clearColor = Color4.FromHexString(getModuleColor(TUNER) as string)
        scene.ambientColor = new Color3(.5, .5, .5)

        // setup camera
        const camPos = new Vector3(diameter/2 + 200, 0, 0)
        const camera = new TargetCamera('tunerCam', camPos, scene)
        //camera.fov = Math.PI / 3
        camera.setTarget(new Vector3(0, 0, 0))

        // setup lighting
        const lightPos = new Vector3(1110.5, 300, 0)
        //const light= new PointLight('light', lightPos, scene)
        const light = new PointLight('light', lightPos, scene)
        light.diffuse = new Color3(1, 0, 0)
        light.specular = new Color3(0, .1, 0)

        //make dial
        makeDial(scene)
        
      }}
      onRender={scene => {
        if (frame === 0) {
          const [maxFreq, maxdB] = tuner.controlSetFuncs['tuner']('') as Range
          if (maxdB > -75) {
            target = mapValBetweenRanges(clamp(Math.log(maxFreq), noteFreqRange as Range), noteFreqRange, dialRange)
          } else {
            target = -.15
          }
        }
        const dial = scene.getMeshByName('dial') as Mesh
        dial.rotation.y += .1 * (target - dial.rotation.y)
        frame = (frame + 1) % 30
      }}
      style={{
        borderRadius: '.8em',
        marginTop: '1em',
      }}
      width={sizes.moduleView.bigIconWidth}
      height='200px'
    />
  )
}

export default Tuner