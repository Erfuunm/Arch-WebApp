import { useState } from 'react'
import { motion } from 'framer-motion'
import ArchitectureGallery from './components/ArchitectureGallery'
import ArchitectureTower from './components/ArchitectureTower'
import FloatingGallery2 from './components/FloatingGallery2'

export default function App() {
  const [viewMode, setViewMode] = useState<'gallery' | 'tower'>('gallery')
  
  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      {/* Toggle between views */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg ${viewMode === 'gallery' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
          onClick={() => setViewMode('gallery')}
        >
          Floating Gallery
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg ${viewMode === 'tower' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
          onClick={() => setViewMode('tower')}
        >
          Architectural Tower
        </motion.button>
      </div>
      
      {viewMode === 'gallery' ? <ArchitectureGallery /> : <FloatingGallery2 />}
      
      {/* Contact info fixed at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-0 w-full text-center text-white text-sm"
      >
        <p>contact@yourarchitecture.com | +1 234 567 890</p>
      </motion.div>
    </div>
  )
}