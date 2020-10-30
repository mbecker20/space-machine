import { AbstractMesh, Color3, MeshBuilder, Plane, Scene, StandardMaterial, TransformNode } from "@babylonjs/core"
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui"
import { Range } from "../../../../audioModules/moduleTypes"
import { mapValBetweenRanges } from "../../../../helpers/genFuncs"
import { noteIndices, notes, notesNoSharp } from "../../../../helpers/notes"

export const noteFreqRange = [Math.log(notes['C1']), Math.log(notes['C5'])] as Range
export const dialRange = [0, 2 * Math.PI * .95] as Range

export const diameter = 1600
const height = 160

function makeTextPlane(name: string, text: string, width: number, fontSize: number) {
  const textPlane = MeshBuilder.CreatePlane(name, {
    width,
    height: 40,
    sourcePlane: new Plane(1, 0, 0, 0)
  })
  const textMat = AdvancedDynamicTexture.CreateForMesh(textPlane)
  const textBlock = new TextBlock(`${name}text`, text)
  textBlock.fontSize = fontSize
  textBlock.width = width
  textBlock.height = 50
  textBlock.color = 'black'
  textMat.addControl(textBlock)
  return textPlane
}

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
  Object.keys(notesNoSharp).filter((note, index) => index >= noteIndices['C1'] && index <= noteIndices['C5']).forEach(note => {
    const tickPos = mapValBetweenRanges(Math.log(notes[note]), noteFreqRange, dialRange)
    const tickNode = new TransformNode(`${note}node`)
    //tickNode.position.y = -10
    const tick = MeshBuilder.CreateBox(`${note}tick`, {
      height: height/2,
      width: 2,
      depth: 10,
    })
    tick.material = tickMat
    tick.position.x = diameter / 2 + 2
    tick.parent = tickNode
    tickNode.rotation.y = -tickPos
    tickNode.parent = dial

    const noteTextPlane = makeTextPlane(`${note}textplane`, note, 50, 450)
    noteTextPlane.position.y = height/2 - 20
    noteTextPlane.parent = tick

    const freqTextPlane = makeTextPlane(`${note}freqplane`, `${notes[note]}`.slice(0, Math.min(`${notes[note]}`.length, 5)), 50, 400)
    freqTextPlane.position.y = - height/2 + 20
    freqTextPlane.parent = tick
  })
}

export default makeDial