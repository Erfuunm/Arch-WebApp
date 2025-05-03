import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types/projects';

interface ProjectDisplayProps {
  projects: Project[];
}

export const ProjectDisplay = ({ projects }: ProjectDisplayProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark/90 backdrop-blur-sm p-6 rounded-lg max-w-md border border-accent pointer-events-auto"
        >
          <h3 className="text-xl font-bold text-accent">{selectedProject.title}</h3>
          <p className="mt-2">{selectedProject.description}</p>
          <button
            onClick={() => setSelectedProject(null)}
            className="mt-4 px-4 py-2 bg-accent text-dark rounded hover:bg-accent/80 transition"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};