import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Lights from "./Lights"
import Model from './Model'

export default function ModelLoader() {
  return (
    <div className="h-[80vh]">
      <Canvas>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ambientLight intensity={0.3} />
        <Lights/>
        
        <OrbitControls/>
      </Canvas>
    </div>
  )
}