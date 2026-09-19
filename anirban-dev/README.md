# Anirban Karmakar — Portfolio

React + Vite + Framer Motion portfolio, with a Vercel Function contact form powered by Resend.

## Run the frontend locally

```bash
npm install
npm run dev
```

## CV

Place your resume at:

`public/Anirban_Karmakar_Resume.pdf`

## Contact form

Production flow:

`React form → /api/contact → Vercel Function → Resend → anirban@ianirban.in`

The Resend API key is server-side only and is never exposed to the browser.

### Required Vercel environment variable

Create:

`RESEND_API_KEY = re_...`

Optional:

`CONTACT_FROM_EMAIL = Anirban Portfolio <hello@contact.ianirban.in>`

### Resend domain

Recommended: verify the sending subdomain `contact.ianirban.in` in Resend and add the exact DNS records Resend provides in GoDaddy.

This keeps website DNS and your existing `anirban@ianirban.in` mailbox separate. Do not delete or replace the existing MX records used by your mailbox.

After the sending domain is verified, redeploy the Vercel project and test the contact form.

## Deploy to Vercel

Import the project/repository into Vercel. Vite is detected automatically.

Then add `ianirban.in` and `www.ianirban.in` under:

Vercel Project → Settings → Domains

Only change the website DNS records Vercel asks for. Keep your existing mail/MX records.
