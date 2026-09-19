import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const json = (res, status, body) => res.status(status).json(body)

// Remove characters that should not appear in names/email fields.
const clean = (value = '') =>
  String(value)
    .replace(/[<>]/g, '')
    .trim()

// Escape user-provided values before inserting them into HTML.
const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

export default async function handler(req, res) {
  // Only allow POST requests.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, {
      error: 'Method not allowed.',
    })
  }

  try {
    const { name, email, message, website } = req.body || {}

    /*
     * Honeypot field.
     * Normal users never fill this field, but bots often do.
     * Return success so bots don't know they were blocked.
     */
    if (website) {
      return json(res, 200, { ok: true })
    }

    const safeName = clean(name)
    const safeEmail = clean(email)
    const safeMessage = String(message || '').trim()

    // -------------------------------
    // Validation
    // -------------------------------

    if (safeName.length < 2 || safeName.length > 100) {
      return json(res, 400, {
        error: 'Please enter a valid name.',
      })
    }

    if (
      safeEmail.length > 200 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)
    ) {
      return json(res, 400, {
        error: 'Please enter a valid email.',
      })
    }

    if (safeMessage.length < 2 || safeMessage.length > 3000) {
      return json(res, 400, {
        error: 'Please enter a valid message.',
      })
    }

    // Make sure Resend is configured.
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing')

      return json(res, 500, {
        error: 'Email service is not configured.',
      })
    }

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      'Anirban Karmakar <hello@contact.ianirban.in>'

    // =========================================================
    // 1. SEND PORTFOLIO MESSAGE TO ANIRBAN
    // =========================================================

    const { error: enquiryError } = await resend.emails.send({
      from: fromEmail,

      to: ['anirban@ianirban.in'],

      /*
       * When you click Reply in Titan,
       * the reply will go to the visitor.
       */
      replyTo: safeEmail,

      subject: `Portfolio enquiry — ${safeName}`,

      html: `
        <!doctype html>
        <html>
          <body style="
            margin:0;
            padding:0;
            background:#f4f7f5;
            font-family:Arial,Helvetica,sans-serif;
            color:#17211c;
          ">

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding:32px 16px;"
            >
              <tr>
                <td align="center">

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      max-width:600px;
                      background:#ffffff;
                      border:1px solid #dce6e0;
                      border-radius:14px;
                    "
                  >

                    <tr>
                      <td style="padding:30px;">

                        <h2 style="
                          margin:0 0 25px;
                          color:#17211c;
                        ">
                          New portfolio enquiry
                        </h2>

                        <p style="
                          margin:0 0 10px;
                          line-height:1.6;
                        ">
                          <strong>Name:</strong>
                          ${escapeHtml(safeName)}
                        </p>

                        <p style="
                          margin:0 0 24px;
                          line-height:1.6;
                        ">
                          <strong>Email:</strong>
                          ${escapeHtml(safeEmail)}
                        </p>

                        <div style="
                          padding:20px;
                          background:#f5f8f6;
                          border-left:4px solid #3ca66b;
                          border-radius:6px;
                        ">

                          <div style="
                            font-size:13px;
                            font-weight:bold;
                            margin-bottom:10px;
                            color:#597066;
                          ">
                            MESSAGE
                          </div>

                          <div style="
                            white-space:pre-wrap;
                            line-height:1.7;
                          ">${escapeHtml(safeMessage)}</div>

                        </div>

                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>

          </body>
        </html>
      `,

      text: `New portfolio enquiry

Name: ${safeName}
Email: ${safeEmail}

Message:
${safeMessage}`,
    })

    /*
     * The actual portfolio enquiry is the important email.
     * If this fails, tell the frontend that submission failed.
     */
    if (enquiryError) {
      console.error('Resend enquiry error:', enquiryError)

      return json(res, 502, {
        error: 'Could not send the message.',
      })
    }

    // =========================================================
    // 2. SEND BRANDED AUTO-REPLY TO VISITOR
    // =========================================================

    try {
      const { error: autoReplyError } = await resend.emails.send({
        from: fromEmail,

        to: [safeEmail],

        /*
         * If the visitor replies to the acknowledgement,
         * the response goes to your Titan mailbox.
         */
        replyTo: 'anirban@ianirban.in',

        subject: `Thanks for reaching out, ${safeName}`,

        html: `
          <!doctype html>
          <html>
            <body style="
              margin:0;
              padding:0;
              background:#0b1210;
              font-family:Arial,Helvetica,sans-serif;
              color:#e8f0eb;
            ">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  background:#0b1210;
                  padding:40px 16px;
                "
              >
                <tr>
                  <td align="center">

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        max-width:600px;
                        background:#111b17;
                        border:1px solid #243a30;
                        border-radius:16px;
                      "
                    >

                      <!-- HEADER -->

                      <tr>
                        <td style="
                          padding:28px 32px;
                          border-bottom:1px solid #243a30;
                        ">

                          <div style="
                            font-size:21px;
                            font-weight:700;
                            color:#ffffff;
                          ">
                            Anirban Karmakar
                          </div>

                          <div style="
                            margin-top:6px;
                            font-size:13px;
                            color:#71d99c;
                          ">
                            Salesforce Developer
                          </div>

                        </td>
                      </tr>

                      <!-- CONTENT -->

                      <tr>
                        <td style="padding:36px 32px;">

                          <div style="
                            font-size:25px;
                            line-height:1.3;
                            font-weight:700;
                            color:#ffffff;
                            margin-bottom:24px;
                          ">
                            Thanks for reaching out.
                          </div>

                          <p style="
                            margin:0 0 18px;
                            font-size:16px;
                            line-height:1.7;
                            color:#c5d2cb;
                          ">
                            Hi ${escapeHtml(safeName)},
                          </p>

                          <p style="
                            margin:0 0 18px;
                            font-size:16px;
                            line-height:1.7;
                            color:#c5d2cb;
                          ">
                            Thanks for getting in touch through my
                            portfolio. I've received your message and
                            will get back to you as soon as I can.
                          </p>

                          <p style="
                            margin:28px 0 0;
                            font-size:16px;
                            line-height:1.7;
                            color:#c5d2cb;
                          ">
                            Best regards,
                            <br>

                            <strong style="color:#ffffff;">
                              Anirban Karmakar
                            </strong>

                            <br>

                            <span style="
                              color:#71d99c;
                              font-size:14px;
                            ">
                              Salesforce Developer
                            </span>
                          </p>

                          <!-- WEBSITE BUTTON -->

                          <table
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="margin-top:30px;"
                          >
                            <tr>

                              <td
                                bgcolor="#71d99c"
                                style="
                                  border-radius:8px;
                                "
                              >

                                <a
                                  href="https://ianirban.in"
                                  style="
                                    display:inline-block;
                                    padding:13px 22px;
                                    color:#07110c;
                                    font-size:14px;
                                    font-weight:700;
                                    text-decoration:none;
                                  "
                                >
                                  Visit ianirban.in
                                </a>

                              </td>

                            </tr>
                          </table>

                        </td>
                      </tr>

                      <!-- FOOTER -->

                      <tr>
                        <td style="
                          padding:20px 32px;
                          border-top:1px solid #243a30;
                          font-size:12px;
                          line-height:1.6;
                          color:#718078;
                        ">

                          This is an automated acknowledgement
                          confirming that your message was received
                          through

                          <a
                            href="https://ianirban.in"
                            style="
                              color:#71d99c;
                              text-decoration:none;
                            "
                          >
                            ianirban.in
                          </a>.

                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>
              </table>

            </body>
          </html>
        `,

        // Plain-text fallback
        text: `Hi ${safeName},

Thanks for getting in touch through my portfolio.

I've received your message and will get back to you as soon as I can.

Best regards,
Anirban Karmakar
Salesforce Developer

https://ianirban.in

This is an automated acknowledgement confirming that your message was received.`,
      })

      /*
       * Don't fail the original form submission if
       * only the acknowledgement email fails.
       */
      if (autoReplyError) {
        console.error('Auto-reply error:', autoReplyError)
      }
    } catch (autoReplyError) {
      console.error('Auto-reply exception:', autoReplyError)
    }

    // =========================================================
    // 3. RETURN SUCCESS
    // =========================================================

    return json(res, 200, {
      ok: true,
    })
  } catch (error) {
    console.error('Contact API error:', error)

    return json(res, 500, {
      error: 'Could not send the message.',
    })
  }
}