import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'


// Define project type
type Project = {
  id: number
  title: string
  image: string
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number, number]
}

// Your project images (replace with your actual images)
const PROJECTS: Omit<Project, 'position' | 'rotation' | 'size'>[] = [
    { id: 1, title: 'URBAN OASIS', image: '/assets/3361514.jpg' },
    { id: 2, title: 'GLASS PAVILION', image: '/assets/what-is-design-02.jpg' },
    { id: 3, title: 'MOUNTAIN RETREAT', image: '/assets/3361514.jpg' },
    { id: 4, title: 'CULTURAL CENTER', image: '/assets/what-is-design-02.jpg' },
    { id: 5, title: 'SKYLINE TOWER', image: '/assets/3361514.jpg' },
    { id: 6, title: 'LAKESIDE VILLA', image: '/assets/what-is-design-02.jpg' },
  ]
  
  function Building({ position, rotation, size, image }: Project) {
    const meshRef = useRef<THREE.Mesh>(null)
    // Explicitly type the texture as THREE.Texture
    const texture = useTexture(image) as THREE.Texture
    
    return (
      <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial map={texture} metalness={0.2} roughness={0.4} />
      </mesh>
    )
  }

  function FloatingProjects() {
    const groupRef = useRef<THREE.Group>(null)
    const { viewport } = useThree()
    
    useFrame(({ clock }) => {
      if (groupRef.current) {
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      }
    })
  
    // Arrange projects in a 3D space with proper typing
    const projects: Project[] = PROJECTS.map((project, i) => {
      const angle = (i / PROJECTS.length) * Math.PI * 2
      const radius = 5
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      
      return {
        ...project,
        position: [x, 0, z] as [number, number, number],
        rotation: [0, -angle, 0] as [number, number, number],
        size: [3, 4, 0.1] as [number, number, number] // Width, height, depth
      }
    })
  
    return (
      <group ref={groupRef}>
        {projects.map((project) => (
          <Building key={project.id} {...project} />
        ))}
      </group>
    )
  }

export default function ArchitectureGallery() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  
  return (
    <div className="relative h-screen w-full bg-black">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="city" />
        <FloatingProjects />
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold">ARCHITECTURAL VISIONS</h1>
          <p className="text-xl md:text-2xl mt-2">Exploring space through design</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white text-center"
        >
          <p className="text-lg">Scroll to navigate</p>
          <p className="text-sm mt-2">Click and drag to rotate view</p>
        </motion.div>
      </div>
    </div>
  )
}