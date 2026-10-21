# WTS Nova visual system

The existing concepts and approved copy are retained. Shared tokens live in `src/app/design-system.css`; each section owns its layout in a small adjacent stylesheet.

## Foundation

- Original cream, navy, primary blue, and soft blue palette; muted text uses explicit readable foreground colors.
- Manrope for UI and the hero; Instrument Serif for editorial headings, with the original italic hero line. Fonts are configured once in `src/app/layout.tsx` and self-hosted by Next.js.
- One 1160px content measure with responsive 20–48px gutters.
- Desktop vertical section rhythm: 72–96px. Phone rhythm: 56px. The cinematic pinned section is an intentional exception.
- Desktop hero: 52–64px. Section headings: 36–44px. Editorial card titles: 24–28px. Body: 16px, with an 18px CTA lead. Utility text uses 10–14px according to role.
- Shared 12/20/28px surface radii; capsules and circles remain limited to their approved design concepts.

## Section treatment

- Hero: navy/cream editorial type with a sweeping open SVG horizon, soft blue light, a small cream highlight, and no forced viewport height. A transparent, page-wide sticky header floats over the same continuous navy intro, with reserved top space and anchor offsets. Arc geometry is static, with reduced-motion-aware ambient light animation.
- Services: equal, outward-staggered capsules with readable navy text, defined blue-gray borders, restrained frosted-glass surfaces, and soft elevation. Static blue ambient gradients and a consistently visible, full-section fine grid add depth to the cream section; opaque surfaces provide a fallback without backdrop-filter support.
- Audience: quieter blue/cream capsules and precise image/text alignment. Decorative orbit rings removed.
- Why Nova: text-only editorial split layout with smaller Lucide icons and the original flowing connector. The desk image was removed following feedback; its source file remains untouched.
- Founder: navy panel retained, feature points simplified into two lightweight rows, stats presented as an unboxed editorial strip. The approved portrait placeholder remains until the real photograph is supplied.
- CTA: focused navy composition, proportionate typography, single atmospheric gradient.
- Footer: rounded navy panel on cream, overlapping logo position, smaller centered wordmark, readable navigation.

## Motion and accessibility

- The warehouse scroll-to-enter section was removed following feedback. Services follows the Trust Bar directly, with no pin spacers or extra scroll distance. The original image is retained in public assets.
- A single IntersectionObserver reveals below-the-fold groups once. Content is readable without JavaScript. A reduced-motion preference change clears pending reveals.
- The ticker retains its pause control and reduced-motion static version. Primary interactive targets are at least 44px high.
- No invented contact details or replacement brand assets. Missing destinations stay explicitly unavailable in the final CTA/footer; existing navigation now targets actual completed sections.

## Mobile behavior

- Native device-width viewport with zoom enabled, navy browser theme, and safe-area coverage. Shared gutters and sticky-header spacing account for display cutouts; the footer clears the home indicator.
- The disclosure menu scrolls within the available dynamic viewport on short screens without locking page scrolling. It closes on selection, Escape, outside interaction, focus leaving the header, and desktop breakpoint changes.
- At 640–767px the founder panel stacks rather than squeezing the portrait and copy into narrow columns. Below 360px the footer navigation uses one column.
- The hero's arc remains below content in portrait and landscape. Touch devices retain a static atmospheric gradient instead of continuously moving the blurred layer.
