import { motion } from 'framer-motion'
import { stack } from '../data/portfolio'
import Reveal from './Reveal'

export default function TechStack() {
  return (
    <section id="stack" className="section-shell content-section">
      <Reveal>
        <div className="card stack-panel">
          <p className="eyebrow">Technical stack</p>
          <div className="stack-grid">
            {stack.map((group, groupIndex) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-list">
                  {group.items.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.08 + index * 0.025 }}
                      whileHover={{ y: -2 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
