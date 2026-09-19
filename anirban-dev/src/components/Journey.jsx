import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { journey } from '../data/portfolio'
import Reveal from './Reveal'

export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 65%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })

  return (
    <section id="journey" className="section-shell content-section journey-section" ref={ref}>
      <Reveal className="section-heading">
        <p className="eyebrow">Professional + educational roadmap</p>
        <h2>Present → foundations.</h2>
        <p className="section-copy">
          A reverse-chronological path through my professional experience and education.
          Scroll to move backward through the journey.
        </p>
      </Reveal>

      <div className="timeline">
        <div className="timeline-rail">
          <motion.div className="timeline-progress" style={{ scaleY }} />
        </div>

        {journey.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={`${item.period}-${item.title}`}
            initial={{ opacity: 0.28 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.55 }}
            transition={{ duration: 0.45 }}
          >
            <motion.div
              className="timeline-node"
              initial={{ scale: 0.75 }}
              whileInView={{ scale: 1 }}
              viewport={{ amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              {index + 1}
            </motion.div>

            <motion.div
              className="card timeline-card"
              initial={{ opacity: 0, x: 28, y: 18 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 6 }}
            >
              <div className="timeline-meta">
                <p className="eyebrow">{item.kind}</p>
                <span>{item.period}</span>
              </div>
              <h3>{item.title}</h3>
              <h4>{item.organisation}</h4>
              <p>{item.detail}</p>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
