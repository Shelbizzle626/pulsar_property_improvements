# Pulsar Property Improvements — website

A four-section static site (Services · Specialties · About · Contact) built with plain
HTML/CSS/JS. No build step — drop it on GitHub Pages, Netlify, or any static host.

## Files
- `index.html` — all page content
- `styles.css` — design system (palette pulled from your logo)
- `script.js` — mobile menu + contact-form validation/submit
- `assets/ppi-logo.png` — your logo (used in the footer + as the favicon)

## Before you publish — fill these in
Search `index.html` (and `script.js`) for the placeholders:

| Placeholder | Where | What to put |
|---|---|---|
| `(000) 000-0000` | hero `tel:`, contact list, footer | real phone |
| `hello@pulsarpi.com` | contact list, footer, `script.js` | real email |
| `00-000000` / `Lic#` | hero creds + footer | your license number |
| `Wasatch Back & SLC` | hero, about, footer | your actual service area |
| `YOUR_FORM_ID` | the `<form action="…">` | your Formspree endpoint (below) |

Also review the service/specialty copy — it's written as a strong starting point, but
swap in the exact work you want to lead with.

## Making the contact form actually send
The form works two ways:

1. **No setup (default):** if you haven't added a Formspree endpoint, hitting "Send
   request" opens the visitor's email app with the details pre-filled to your address.
2. **Direct send (recommended):** create a free form at https://formspree.io, then
   replace `YOUR_FORM_ID` in the `<form action>` with your endpoint
   (e.g. `https://formspree.io/f/abcd1234`). Submissions then post straight to your
   inbox and show an inline "thanks" message — no redirect.

On **Netlify** you can instead add `netlify` to the `<form>` tag and skip Formspree.

## Deploy to GitHub Pages
1. Put these files in the root of a repo (e.g. `pulsar-site`).
2. Push to GitHub.
3. Repo → **Settings → Pages** → Source: `main` branch, `/root`.
4. Your site goes live at `https://<username>.github.io/<repo>/`.

## Design notes
- **Palette:** ink `#121214`, pulsar gold `#E8B62C`, deep gold `#BD8A14`, warm paper
  `#FAF7F0`, dark band `#16181D` — all derived from the logo.
- **Type:** Bricolage Grotesque (display), Hanken Grotesk (body), Space Mono (labels).
- **Signature:** the radiating "pulsar" behind the hero (and faint in the dark band)
  is built in CSS, pulses slowly, and respects `prefers-reduced-motion`.
