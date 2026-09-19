import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const json = (res, status, body) => res.status(status).json(body)

const clean = (value = '') =>
  String(value)
    .replace(/[<>]/g, '')
    .trim()

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed.' })
  }

  try {
    const { name, email, message, website } = req.body || {}

    // Honeypot: bots often fill hidden fields.
    if (website) return json(res, 200, { ok: true })

    const safeName = clean(name)
    const safeEmail = clean(email)
    const safeMessage = String(message || '').trim()

    if (safeName.length < 2 || safeName.length > 100) {
      return json(res, 400, { error: 'Please enter a valid name.' })
    }

    if (
      safeEmail.length > 200 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)
    ) {
      return json(res, 400, { error: 'Please enter a valid email.' })
    }

    if (safeMessage.length < 2 || safeMessage.length > 3000) {
      return json(res, 400, { error: 'Please enter a valid message.' })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing')
      return json(res, 500, { error: 'Email service is not configured.' })
    }

    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        'Anirban Portfolio <hello@contact.ianirban.in>',
      to: ['anirban@ianirban.in'],
      replyTo: safeEmail,
      subject: `Portfolio enquiry — ${safeName}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17211c">
          <h2 style="margin-bottom:20px">New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space:pre-wrap">${escapeHtml(safeMessage)}</div>
        </div>
      `,
      text: `New portfolio message

Name: ${safeName}
Email: ${safeEmail}

Message:
${safeMessage}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return json(res, 502, { error: 'Could not send the message.' })
    }

    return json(res, 200, { ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return json(res, 500, { error: 'Could not send the message.' })
  }
}
