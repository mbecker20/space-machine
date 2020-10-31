import { Color3, Color4, Mesh, PointLight, TargetCamera, Vector3, VertexBuffer } from '@babylonjs/core'
import React from 'react'
import { VisualizerModule } from '../../../../audioModules/modules/visualizer'
import { sizes } from '../../../../theme/theme'
import BabylonCanvas from '../../../BabylonCanvas/BabylonCanvas'
import { diameter, getSphereTargetArray, stepSpherePosition, makeSphereAndIndexCorrelator, NumberIndexedObj } from './helpers'

interface Props {
  modID: string
}

function Visualizer({ modID }: Props) {
  const visualizer = window.audioModules[modID] as VisualizerModule
  let frame = 0
  let indexCorrelator: NumberIndexedObj = {}
  let originalPositions: number[] = []
  let targetArray: number[] = []
  let prevArray: number[] = []
  return (
    <BabylonCanvas
      onSceneReady={scene => {
        // set background / ambient color
        scene.clearColor = new Color4(0, 0, 0)
        scene.ambientColor = new Color3(.5, .5, .5)

        // create camera
        const camPos = new Vector3(diameter/2 + 200, 0, 0)
        const camera = new TargetCamera('cam', camPos, scene)
        camera.setTarget(new Vector3(0, 0, 0))

        //setup light
        const lightPos = new Vector3(diameter/2 + 200, 300, 0)
        const light = new PointLight('light', lightPos, scene)
        light.diffuse = new Color3(1, 0, 0)
        light.specular = new Color3(0, .1, 0)

        indexCorrelator = makeSphereAndIndexCorrelator(scene, visualizer.bufferLength, 3)
        originalPositions = scene.getMeshByName('sphere')?.getVerticesData(VertexBuffer.PositionKind) as number[]
        targetArray = [...originalPositions]
        prevArray = [...originalPositions]
      }}
      onRender={scene => {
        const sphere = scene.getMeshByName('sphere') as Mesh
        sphere.rotation.y += .01
        if (frame === 0) {
          visualizer.controlSetFuncs['visualizer-update']('')
          targetArray = getSphereTargetArray(originalPositions, visualizer.freqArray, indexCorrelator, 1/100, 200)
        }
        prevArray = stepSpherePosition(sphere, prevArray, targetArray, 1/10)
        frame = (frame + 1) % 15
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

export default Visualizer