import React, { CanvasHTMLAttributes, useEffect, useRef } from 'react'
import { Engine, EngineOptions, Scene, SceneOptions } from '@babylonjs/core'
import useJSS from './style'

interface Props extends CanvasHTMLAttributes<HTMLCanvasElement> {
  antialias?: boolean
  engineOptions?: EngineOptions
  adaptToDeviceRatio?: boolean
  sceneOptions?: SceneOptions
  onRender: (scene: Scene) => void
  onSceneReady: (scene: Scene) => void
  width?: string,
  height?: string,
}

function BabylonCanvas({ 
  onRender, onSceneReady, 
  antialias, engineOptions, 
  adaptToDeviceRatio, sceneOptions,
  width, height, ...rest 
}: Props) {
  const reactCanvas = useRef<HTMLCanvasElement>(null)
  const { BabylonCanvas } = useJSS({ width, height })
  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio)
      const scene = new Scene(engine, sceneOptions)
      if (scene.isReady()) {
        if (onSceneReady) onSceneReady(scene)
      } else {
        scene.onReadyObservable.addOnce(scene => { if (onSceneReady) onSceneReady(scene) })
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene)
        }
        scene.render()
      })

      const resize = () => {
        scene.getEngine().resize()
      }

      if (window) {
        window.addEventListener('resize', resize)
      }

      return () => {
        scene.getEngine().dispose()

        if (window) {
          window.removeEventListener('resize', resize)
        }
      }
    }
  }, [adaptToDeviceRatio, antialias, engineOptions, onRender, onSceneReady, sceneOptions])

  return (
    <canvas className={BabylonCanvas}
      ref={reactCanvas} 
      {...rest} 
    />
  )
}

export default BabylonCanvas