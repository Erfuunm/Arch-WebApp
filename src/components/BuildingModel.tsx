import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export default function BuildingModel() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group>
      {/* Base building */}
      <mesh ref={meshRef} position={[0, -1, 0]}>
        <boxGeometry args={[4, 6, 4]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Additional architectural elements */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.1} />
      </mesh>
      
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#777777" metalness={0.8} roughness={0.05} />
      </mesh>
    </group>
  )
}