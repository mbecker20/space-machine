import { AbstractMesh, Color3, Color4, Mesh, MeshBuilder, Plane, PointLight, Scene, StandardMaterial, TargetCamera, TransformNode, Vector3 } from '@babylonjs/core'
import { AdvancedDynamicTexture } from 'babylonjs-gui'
import React, { Fragment } from 'react'
import { Range, TUNER } from '../../../audioModules/moduleTypes'
import { mapValBetweenRanges } from '../../../helpers/genFuncs'
import { noteIndices, notes, notesNoSharp } from '../../../helpers/notes'
import getModuleColor from '../../../theme/moduleColor'
import { sizes } from '../../../theme/theme'
import BabylonCanvas from '../../BabylonCanvas/BabylonCanvas'
import Button from '../../Button/Button'
import FlexRow from '../../Flex/FlexRow'


interface Props {
  modID: string
}

const noteFreqRange = [Math.sqrt(notes['C1']), Math.sqrt(notes['C6'])]

const diameter = 1600
const height = 160

function makeDial(scene: Scene) {
  const dialMat = new StandardMaterial('dialMat', scene)
  const tickMat = new StandardMaterial('tickMat', scene)
  tickMat.diffuseColor = new Color3(0, .5, 0)

  const dial = MeshBuilder.CreateCylinder('dial', {
    height,
    diameter,
    tessellation: Math.pow(2, 7),
  }, scene)
  dial.material = dialMat
  dial.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION
  Object.keys(notesNoSharp).filter((note, index) => index <= noteIndices['C6']).forEach(note => {
    const tickPos = mapValBetweenRanges(Math.sqrt(notes[note]), noteFreqRange as Range, [0, 2 * Math.PI * .95])
    const tickNode = new TransformNode(`${note}node`)
    const tick = MeshBuilder.CreateBox(`${note}tick`, {
      height: height - 50,
      width:5,
      depth: 2,
    })
    tick.material = tickMat
    tick.position.x = diameter / 2
    tick.parent = tickNode
    tickNode.rotation.y = -tickPos
    tickNode.parent = dial

    const textPlane = MeshBuilder.CreatePlane(`${note}textplane`, {
      width: 20,
      height: 20,
      sourcePlane: new Plane(1, 0, 0, 0)
    }, scene)
    textPlane.position.y = height - 30
    textPlane.parent = tick
    const textMat = AdvancedDynamicTexture.CreateForMesh(textPlane)
  })
}

function Tuner({ modID }: Props) {
  let target = 0
  return (
    <Fragment>
      <BabylonCanvas
        onSceneReady={scene => {
          // set background / ambient color
          scene.clearColor = Color4.FromHexString(getModuleColor(TUNER) as string)
          scene.ambientColor = new Color3(.5, .5, .5)

          // setup camera
          const camPos = new Vector3(1001, 0, 0)
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
          const dial = scene.getMeshByName('dial') as Mesh
          dial.rotation.y += .1 * (target - dial.rotation.y)
        }}
        style={{
          borderRadius: '.8em'
        }}
        width={sizes.moduleView.bigIconWidth}
        height='100px'
      />
      <FlexRow>
        <Button
          onClick={() => {
            target += Math.PI/32
          }}
        >
          rotate left
        </Button>
        <Button
          onClick={() => {
            target -= Math.PI / 32
          }}
        >
          rotate right
        </Button>
      </FlexRow>
    </Fragment>
  )
}

export default Tuner