import { SphereScene } from './ProjectSphere'
import { ProjectDisplay } from './ProjectDisplay'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'


export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    // Add other properties as needed
  }
  
  export type Projects = Project[];

const projects = [
    {
      id: 1,
      title: "Modern Villa",
      description: "Contemporary residential design",
      image: "/assets/3361514.jpg",
      // No need for manual position - will auto-map to faces
    },
    {
      id: 2,
      title: "Urban Tower",
      description: "High-rise commercial building",
      image: "/assets/what-is-design-02.jpg"
    },
    {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
      {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
      {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
      {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
      {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
      {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
      {
        id: 1,
        title: "Modern Villa",
        description: "Contemporary residential design",
        image: "/assets/3361514.jpg",
        // No need for manual position - will auto-map to faces
      },
      {
        id: 2,
        title: "Urban Tower",
        description: "High-rise commercial building",
        image: "/assets/what-is-design-02.jpg"
      },
    // Add up to 20 projects (one per face)
  ]

export const LandingPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-accent">Architect Studio</h1>
        <div className="flex space-x-6">
          <a href="#about" className="hover:text-accent transition">About</a>
          <a href="#projects" className="hover:text-accent transition">Projects</a>
          <a href="#contact" className="hover:text-accent transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section with 3D Sphere */}
      <section ref={ref} className="h-screen flex flex-col items-center justify-center">

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: inView ? 1 : 0.5 }}
  transition={{ duration: 1 }}
  className="absolute inset-0 w-full h-full"
>
  <SphereScene projects={projects} />
</motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Architectural <span className="text-accent">Innovation</span>
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Transforming visions into breathtaking realities through innovative design
          </motion.p>
        </div>
      </section>

      <ProjectDisplay projects={projects} />

      {/* Other sections would go here */}
    </div>
  )
}