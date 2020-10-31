import { Mesh, MeshBuilder, Scene, StandardMaterial, VertexBuffer } from "@babylonjs/core";
import { multiply } from "mathjs";
import { clamp, GetAzimXZ, mapValBetweenRanges } from "../../../../helpers/genFuncs";

export const diameter = 100

export type Position = [number, number, number]
export type NumberIndexedObj = { [index: number]: number }

export function stepSpherePosition(sphere: Mesh, prevArray: number[], targetArray: number[], rate: number) {
  // rate should be [0, 1], prob pretty low
  const newPositionArray = prevArray.map((val, index) => {
    return val + rate * (targetArray[index] - val)
  })
  sphere.updateVerticesData(VertexBuffer.PositionKind, newPositionArray)
  return newPositionArray
}

export function getSphereTargetArray(originalPositions: number[], sourceArray: Float32Array, sphereIndexCorrelator: NumberIndexedObj, scale: number, offset: number) {
  let targetArray: number[] = []
  for (let i = 0; i < originalPositions.length; i += 3) {
    const position: Position = [originalPositions[i], originalPositions[i + 1], originalPositions[i + 2]]
    const target = makeTargetForPoint(position, i, sphereIndexCorrelator, sourceArray, scale, offset)
    targetArray.push(...target)
  }
  return targetArray
}

export function makeSphereAndIndexCorrelator(scene: Scene, bufferLength: number, subdivisisions: number) {
  const sphere = MeshBuilder.CreateSphere('sphere', {
    segments: Math.pow(2, 6),
    diameter,
    updatable: true
  }, scene)
  const mat = new StandardMaterial('sphereMat', scene)
  sphere.material = mat
  return makeSphereIndexCorrelator(sphere, bufferLength, subdivisisions)
}

function makeSphereIndexCorrelator(sphere: Mesh, bufferLength: number, subdivisions: number) {
  const positions = sphere.getVerticesData(VertexBuffer.PositionKind)
  const indexCorrelator: NumberIndexedObj = {}
  if (positions) {
    for (let i = 0; i < positions.length; i += 3) {
      const azim = GetAzimXZ(positions[i], positions[i+2])
      indexCorrelator[i] = Math.floor(mapValBetweenRanges(
        azim % (2 * Math.PI / subdivisions), 
        [0, 2 * Math.PI / subdivisions], 
        [0, bufferLength / 16]
      ))
    }
  }
  return indexCorrelator
}

function makeTargetForPoint(position: Position, index: number, sphereIndexCorrelator: NumberIndexedObj, sourceArray: Float32Array, scale: number, offset: number) {
  const positionScale = clamp(scale * (sourceArray[sphereIndexCorrelator[index]] + offset), [.1, 2])
  return multiply(position, positionScale)
}

