# CTA and footer setup

Update `src/lib/site-links.ts` with approved destinations before launch:

- `talk`: a real email link or booking/contact URL.
- `whatsapp`: the floating WhatsApp button uses the verified number `+91 79895 78194` and a prefilled service inquiry.
- `instagram`: the official profile URL.
- `work`: the approved portfolio destination.
- `logo` and `navLogo`: both point to `/images/wts-nova-logo-nav.webp`, a lossless 288px display-size copy of the supplied transparent WTS Nova logo. The untouched original PNG and its full-size WebP copy remain in `public/images/`.

Contact actions without an external destination route to the on-page contact form. Social links render only when a verified profile URL is available. The contact form POSTs inquiries to `wtsnova.agency@gmail.com` through FormSubmit with native required-field validation, a subject, a table-formatted email, and a honeypot field. Confirm FormSubmit's one-time activation email at that inbox before accepting submissions. The navbar and footer use the original WTS Nova artwork from locally available files. Internal footer links target existing sections.

Preview: http://localhost:3000/#get-in-touch
