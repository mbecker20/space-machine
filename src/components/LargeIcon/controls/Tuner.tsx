import { Color3, Color4, Mesh, MeshBuilder, PointLight, Scene, SpotLight, TargetCamera, Vector3 } from '@babylonjs/core'
import React from 'react'
import { sizes } from '../../../theme/theme'
import BabylonCanvas from '../../BabylonCanvas/BabylonCanvas'

interface Props {
  modID: string
}

function makeDial(scene: Scene) {
  const dial = MeshBuilder.CreateCylinder('dial', {
    height: .5,
    diameter: .5
  }, scene)
  return dial
}

function Tuner({ modID }: Props) {
  return (
    <BabylonCanvas
      onSceneReady={scene => {
        // set background / ambient color
        scene.clearColor = new Color4(0, 0, 0)
        scene.ambientColor = new Color3(.5, .5, .5)

        // setup camera
        const camPos = new Vector3(1, 0, 0)
        const camera = new TargetCamera('tunerCam', camPos, scene)
        camera.setTarget(new Vector3(0, 0, 0))

        // setup lighting
        const light= new PointLight('light', camPos, scene)
        light.diffuse = new Color3(1, 0, 0)
        light.specular = new Color3(0, 1, 0)

        //make dial
        const dial = makeDial(scene)
        console.log(dial.position)
        
      }}
      onRender={scene => {
        const dial = scene.getMeshByName('dial') as Mesh
      }}
      width={sizes.moduleView.bigIconWidth}
      height='200px'
    />
  )
}

export default Tuner