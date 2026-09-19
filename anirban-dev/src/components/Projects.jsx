import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import Reveal from './Reveal'

const filters = [
  ['all', 'All'],
  ['salesforce', 'Salesforce'],
  ['integration', 'Integrations'],
]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const visible = projects.filter(p => filter === 'all' || p.type === filter)

  return (
    <section id="work" className="section-shell content-section">
      <Reveal className="section-heading split-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Systems, not just screens.</h2>
        </div>
        <div className="filter-row">
          {filters.map(([value, label]) => (
            <button
              key={value}
              className={filter === value ? 'filter active' : 'filter'}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.article
              layout
              key={project.title}
              className="card project-card"
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
              whileHover={{ y: -7 }}
            >
              <div>
                <p className="eyebrow">{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="tech-line">{project.tech.join(' · ')}</div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
