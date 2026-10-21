# WTS NOVA

A Next.js + TypeScript + Tailwind CSS creative agency homepage with the approved hero, expertise bar, Services, Who We Work With, Why Nova, Founder, CTA, and Footer sections.

## Local preview

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Stop the server with Ctrl+C.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

For a production preview, run `npm run build` followed by `npm start`.

## Approval-stage notes

- The navbar, footer badge, and favicon use the exact dark-background logo supplied at `C:\Users\mdq29\Desktop\WTS Nova\WTS-Logos\logo-tr-for-dark-bg.png`. It was copied byte-for-byte to `public/images/wts-nova-logo-dark.png` (SHA-256 verified). Its transparent canvas is framed with CSS; no logo pixels or colors were edited. The earlier, incorrect horizontal lockup is not used.
- Home, Services, Who We Help, About Us, and Contact navigate to completed page sections. CTA contact buttons and social profiles remain explicitly unavailable; configure verified destinations in `src/lib/site-links.ts`. No contact details have been invented.
- All supplied hero and trust-bar copy is preserved, including “SOCIAL MEIDA MARKETING”.
- Manrope and Instrument Serif (regular and italic) are configured once in `src/app/layout.tsx`, downloaded at build time by `next/font`, and self-hosted in production. The initial build requires internet access.
- Hero and trust-bar animations are CSS-only, support reduced motion, and the expertise ticker pauses on hover.

## Retained warehouse image

- The warehouse scroll-to-enter section and its pinning animation were removed following feedback. Services now follows the Trust Bar directly.
- The original supplied PNG is saved unchanged at `public/images/wts-nova-warehouse.png` (6688 × 3764). Its SHA-256 checksum was verified against the source file. No replacement image, color treatment, or extra overlays are used.
- The original PNG remains available for future use but is not rendered or downloaded by the homepage.
- For the current production preview: `npm run build`, then `npm run start -- --port 3001`, and open http://localhost:3001.

## Design system and browser QA

Shared design tokens and motion helpers are in `src/app/design-system.css`. The refinement decisions are documented in `DESIGN.md`. Component styles use the same typography, container, spacing, radius, and color tokens.

With the preview running, run `npm run check:ui`. It uses an installed Chrome/Chromium (no additional test library) and checks 19 phone, tablet, landscape, breakpoint, and desktop sizes from 320px to 1920px. Phone checks use mobile viewport emulation, touch input, and 2× pixel density. Checks cover text overflow, anchors, capsule sizing, 44px touch targets, sticky navigation, scrollable landscape menus, breakpoint transitions, simulated notch insets, pinch-zoom availability, direct Trust Bar-to-Services flow, reduced motion, no-JavaScript readability, and browser exceptions. Screenshots and a JSON report are saved outside the project in the temporary `opencode/wts-nova-qa` directory. These are browser-emulation checks, not a substitute for final real-device QA.

Set `CHROME_PATH` if Chrome is installed in a nonstandard location; set `PREVIEW_URL` to test a different preview port. Optional `QA_OUTPUT` changes the report directory.
