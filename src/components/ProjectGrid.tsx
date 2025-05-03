import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  { id: 1, title: 'Urban Oasis', type: 'Residential', image: '/assets/3361514.jpg' },
  { id: 2, title: 'Glass Pavilion', type: 'Commercial', image: '/assets/what-is-design-02.jpg' },
  { id: 3, title: 'Mountain Retreat', type: 'Residential', image: '/assets/3361514.jpg' },
  { id: 4, title: 'Cultural Center', type: 'Public', image: '/assets/what-is-design-02.jpg' },
  { id: 5, title: 'Skyline Tower', type: 'Commercial', image: '/assets/3361514.jpg' },
  { id: 6, title: 'Lakeside Villa', type: 'Residential', image: '/what-is-design-02.jpg' },
]

export default function ProjectGrid() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  return (
    <section ref={ref} className="py-20 bg-dark-100">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Featured <span className="text-accent">Projects</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-2xl"
            >
              <div className="h-80 bg-gray-800 overflow-hidden">
                {/* Replace with your actual project images */}
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">Project {project.id}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                  <p className="text-accent">{project.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}