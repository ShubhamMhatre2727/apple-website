import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import Model from './Model'

export default function ModelLoader() {
  return (
    <div className="h-[80vh]">
      <Canvas>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ambientLight intensity={3} position={[0,0,5]}/>
  <directionalLight  position={true} />
  <rectAreaLight position intensity={1}/>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}