import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture, Environment, Text, Float } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  id: number;
  title: string;
  image: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
};

const PROJECTS: Omit<Project, 'position' | 'rotation' | 'size'>[] = [
  { id: 1, title: 'Skyline Tower', type: 'Commercial', image: '/assets/3361514.jpg' },
  { id: 2, title: 'Lakeside Villa', type: 'Residential', image: '/assets/3361514.jpg' },
  { id: 3, title: 'Urban Oasis', type: 'Mixed-Use', image: '/assets/3361514.jpg' },
  { id: 4, title: 'Glass Pavilion', type: 'Cultural', image: '/assets/3361514.jpg' },
];

interface ProjectDisplayProps {
  id: number;
  title: string;
  type: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

function ProjectDisplay({ id, title, type, image, isSelected, onClick }: ProjectDisplayProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);
  
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({
    scale: hovered || isSelected ? 1.1 : 1,
    config: { mass: 1, tension: 300, friction: 15 }
  });

  const { glowIntensity } = useSpring({
    from: { glowIntensity: 0.5 },
    to: { glowIntensity: isSelected ? 2 : 0.5 },
    config: { duration: 1000 }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <a.group scale={scale} onClick={onClick}>
        <mesh
          ref={meshRef}
          castShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial
            map={texture}
            metalness={0.3}
            roughness={0.4}
            emissive="#ffffff"
            emissiveIntensity={glowIntensity.get()}
          />
        </mesh>
        {isSelected && (
          <Text
            position={[0, -1.5, 0]}
            color="white"
            fontSize={0.3}
            anchorX="center"
            anchorY="middle"
          >
            {title}
          </Text>
        )}
      </a.group>
    </Float>
  );
}

// Main Gallery Component
function FloatingGalleryScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Add gesture controls for mobile
  const bind = useGesture({
    onDrag: ({ offset: [x] }) => {
      if (groupRef.current && !selectedProject) {
        groupRef.current.rotation.y = x / 200;
      }
    }
  });

  // Smooth orbital rotation with momentum
  useFrame(({ clock }) => {
    if (groupRef.current && !selectedProject) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Arrange projects in a 3D helix
  const projects = PROJECTS.map((project, i) => {
    const angle = (i / PROJECTS.length) * Math.PI * 2;
    const radius = 5;
    const height = i * 1.5 - (PROJECTS.length * 1.5) / 2;
    
    return {
      ...project,
      position: [Math.sin(angle) * radius, height, Math.cos(angle) * radius] as [number, number, number],
    };
  });

  return (
    <group ref={groupRef} {...bind()}>
      {projects.map((project) => (
        <ProjectDisplay
          key={project.id}
          {...project}
          isSelected={selectedProject === project.id}
          onClick={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
        />
      ))}
    </group>
  );
}

// UI Overlay Component
function GalleryUI({ selectedProject, onClose }: any) {
  const project = PROJECTS.find(p => p.id === selectedProject);

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-black/70 backdrop-blur-lg p-8 rounded-xl max-w-2xl pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </motion.button>
            <h2 className="text-3xl font-bold text-white mb-2">{project?.title}</h2>
            <p className="text-accent mb-4">{project?.type}</p>
            <p className="text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main Component
export default function FloatingGallery2() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          enableRotate={!selectedProject}
        />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <Environment preset="studio" />
        <FloatingGalleryScene />
      </Canvas>

      {/* UI Overlay */}
      <GalleryUI 
        selectedProject={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Title & Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-8 left-8 text-white"
      >
        <h1 className="text-4xl font-bold">ARCHITECTURAL</h1>
        <h1 className="text-4xl font-bold text-accent">GALLERY</h1>
        <p className="mt-2 text-white/70">Click on a project to view details</p>
      </motion.div>
    </div>
  );
}