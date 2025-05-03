import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Project, Projects } from '../types/projects';

interface ProjectSphereProps {
  projects: Projects;
}

const ProjectSphere = ({ projects }: ProjectSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState<number | null>(null);
  
  // Create a texture array from project images
  const textures = useTexture(projects.map((p: Project) => p.image));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Create materials array with project textures mapped to faces
  const materials = useMemo(() => {
    const matArray: THREE.MeshStandardMaterial[] = [];
    
    // Create 20 materials (one for each face)
    for (let i = 0; i < 20; i++) {
      if (i < projects.length && textures[i]) {
        textures[i].wrapS = textures[i].wrapT = THREE.RepeatWrapping;
        textures[i].flipY = false;
        matArray.push(new THREE.MeshStandardMaterial({
          map: textures[i],
          roughness: 0.3,
          metalness: 0.7,
          side: THREE.DoubleSide
        }));
      } else {
        matArray.push(new THREE.MeshStandardMaterial({
          color: '#1e293b',
          roughness: 0.5,
          metalness: 0.5
        }));
      }
    }
    
    return matArray;
  }, [textures, projects]);

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        const faceIndex = e.faceIndex !== undefined 
          ? Math.floor(e.faceIndex / 2) 
          : null;
        if (faceIndex !== null) {
          setHover(faceIndex);
        }
      }}
      onPointerOut={() => setHover(null)}
    >
      <icosahedronGeometry args={[3, 2]} />
      {materials.map((material, index) => (
        <primitive key={index} object={material} attach={`material-${index}`} />
      ))}
    </mesh>
  );
};

interface SphereSceneProps {
  projects: Projects;
}

export const SphereScene = ({ projects }: SphereSceneProps) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <ProjectSphere projects={projects} />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={10}
      />
    </Canvas>
  );
};