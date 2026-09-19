import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Send } from 'lucide-react'
import Reveal from './Reveal'

const initial = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const update = e => setForm({ ...form, [e.target.name]: e.target.value })

  const reset = () => {
    setForm(initial)
    setStatus('')
  }

  const submit = async e => {
    e.preventDefault()

    setSending(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: e.currentTarget.website?.value || '' }),
      })

      const body = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(body.error || 'Could not send the message.')
      setForm(initial)
      setStatus('Message sent successfully.')
    } catch (error) {
      setStatus(error.message || 'Could not send the message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-shell content-section contact-section">
      <Reveal className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>Have a hard problem?</h2>
        <p>
          I'm interested in Salesforce engineering, product work and thoughtful automation.
          Send me a message directly.
        </p>
        <a href="mailto:anirban@ianirban.in">anirban@ianirban.in</a>
      </Reveal>

      <motion.form
        className="card contact-form"
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
      >
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={update} required maxLength={100} placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" value={form.email} onChange={update} required type="email" maxLength={200} placeholder="you@example.com" />
        </label>
        <label>
          <span>Message</span>
          <textarea name="message" value={form.message} onChange={update} required rows={7} maxLength={3000} placeholder="Write your message..." />
        </label>

        <div className="honeypot" aria-hidden="true">
          <label>
            <span>Website</span>
            <input name="website" tabIndex="-1" autoComplete="off" />
          </label>
        </div>

        <div className="form-status">{status}</div>

        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={sending}>
            <Send size={17} /> {sending ? 'Sending…' : 'Submit'}
          </button>
          <button className="secondary-button" type="button" onClick={reset}>
            <RotateCcw size={16} /> Reset Form
          </button>
        </div>
      </motion.form>
    </section>
  )
}
