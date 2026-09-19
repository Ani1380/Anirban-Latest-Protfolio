import { motion } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'

const stats = [
  ['4+', 'years Salesforce'],
  ['FinTech', 'P2P lending'],
  ['Apex', 'core engineering'],
  ['LWC', 'UI engineering'],
]

export default function Hero() {
  return (
    <section id="top" className="hero section-shell">
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          className="availability"
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.55 }}
        >
          <span /> Salesforce Developer · West Bengal, India
        </motion.div>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          I build systems
          <br />
          <span>people depend on.</span>
        </motion.h1>

        <motion.p
          className="hero-lead"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7 }}
        >
          Salesforce engineer focused on financial products, automation and integrations —
          turning messy business workflows into reliable software.
        </motion.p>

        <motion.div
          className="hero-actions"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        >
          <a className="primary-button" href="#journey">
            Explore my journey <ArrowDownRight size={18} />
          </a>
          <a className="secondary-button" href="/Anirban_Karmakar_Resume.pdf" download>
            <Download size={17} /> Download CV
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="stats"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.45 }}
      >
        {stats.map(([value, label], index) => (
          <motion.div
            className="stat"
            key={label}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
