import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ContactForm() {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  return (
    <section ref={ref} id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-dark-100 p-8 md:p-12 rounded-xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-8">Get in <span className="text-accent">Touch</span></h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-dark-200 border border-dark-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-dark-200 border border-dark-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full bg-dark-200 border border-dark-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-dark-200 border border-dark-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your message"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-accent text-white px-8 py-3 rounded-lg font-medium text-lg w-full md:w-auto"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}