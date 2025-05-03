import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const BackgroundElements = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i) * 10,
            Math.cos(i * 0.5) * 10,
            Math.cos(i) * 10
          ]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}