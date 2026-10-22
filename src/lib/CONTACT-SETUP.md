# CTA and footer setup

Update `src/lib/site-links.ts` with approved destinations before launch:

- `talk`: a real email link or booking/contact URL.
- `whatsapp`: a verified WhatsApp URL with the correct international number.
- `instagram`: the official profile URL.
- `work`: the approved portfolio destination.
- `logo` and `navLogo`: both point to `/images/wts-nova-logo-nav.webp`, a lossless 288px display-size copy of the supplied transparent WTS Nova logo. The untouched original PNG and its full-size WebP copy remain in `public/images/`.

Contact actions without an external destination route to the on-page contact form. Social links render only when a verified profile URL is available. The contact form validates required fields; connect a verified email delivery service or API endpoint to deliver submissions. The navbar and footer use the original WTS Nova artwork from locally available files. Internal footer links target existing sections.

Preview: http://localhost:3000/#get-in-touch
