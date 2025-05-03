import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import BuildingModel from './BuildingModel' // You'll create this next

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 h-screen w-full -z-10 opacity-20">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <BuildingModel />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </div>
  )
}