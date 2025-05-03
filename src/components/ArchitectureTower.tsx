import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

type FloorProps = {
  position: [number, number, number]
  image: string
  title: string
}


const PROJECTS = [
  { id: 1, title: 'URBAN OASIS', image: '/assets/3361514.jpg' },
  { id: 2, title: 'GLASS PAVILION', image: '/assets/what-is-design-02.jpg' },
  { id: 3, title: 'MOUNTAIN RETREAT', image: '/assets/3361514.jpg' },
  { id: 4, title: 'CULTURAL CENTER', image: '/assets/what-is-design-02.jpg' },
  { id: 5, title: 'SKYLINE TOWER', image: '/assets/3361514.jpg' },
  { id: 6, title: 'LAKESIDE VILLA', image: '/assets/what-is-design-02.jpg' },
]

function Floor({ position, image, title }: FloorProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    // Explicitly type the texture as THREE.Texture
    const texture = useTexture(image) as THREE.Texture
    
    return (
      <group position={position}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[6, 0.2, 6]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[5.8, 0.01, 5.8]} />
          <meshStandardMaterial map={texture} metalness={0.1} roughness={0.5} />
        </mesh>
        <Text
          position={[0, 0.3, -3.2]}
          color="white"
          fontSize={0.4}
          maxWidth={5}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          {title}
        </Text>
      </group>
    )
  }

function ArchitecturalTower() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, -5, 0]}>
      {PROJECTS.map((project, i) => (
        <Floor 
          key={project.id} 
          position={[0, i * 2.5, 0]} 
          image={project.image} 
          title={project.title}
        />
      ))}
    </group>
  )
}

export default function ArchitectureTower() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={50} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={25}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        <Environment preset="sunset" />
        <ArchitecturalTower />
      </Canvas>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ARCHITECTURAL TOWER</h1>
          <p className="text-xl">Each floor represents a different project</p>
        </motion.div>
      </div>
    </div>
  )
}