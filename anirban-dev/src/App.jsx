import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Certifications from './components/Certifications'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.35 })

  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <div className="page-grid" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Journey />
        <Certifications />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
