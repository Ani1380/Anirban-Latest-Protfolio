import { motion } from 'framer-motion'
import { certifications } from '../data/portfolio'
import Reveal from './Reveal'

export default function Certifications() {
  return (
    <section id="certifications" className="section-shell content-section">
      <Reveal className="section-heading">
        <p className="eyebrow">Certifications & courses</p>
        <h2>Platform credentials.</h2>
      </Reveal>

      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <motion.article
            className={`card cert-card ${index === 3 ? 'cert-wide' : ''}`}
            key={cert.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            whileHover={{ y: -5 }}
          >
            <p className="eyebrow">{cert.status}</p>
            <h3>{cert.title}</h3>
            <p>{cert.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
