import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-accent">Architectural</span> Visions
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Crafting spaces that inspire and endure. Explore my portfolio of innovative architectural designs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-white px-8 py-3 rounded-full font-medium text-lg"
          >
            View Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}