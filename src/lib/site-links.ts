// Supply verified destinations here before launch. Null keeps unavailable
// actions visibly disabled rather than inventing contact details or profiles.
export const siteLinks: {
  talk: string | null;
  whatsapp: string | null;
  instagram: string | null;
  work: string | null;
  logo: string | null;
  navLogo: string | null;
} = {
  talk: null,
  whatsapp: null,
  instagram: null,
  work: null,
  // Display-resolution lossless copy of the supplied artwork (288px covers 3x at the
  // 94px navbar/footer size). The untouched full-resolution files stay in public/images.
  logo: "/images/wts-nova-logo-nav.webp",
  navLogo: "/images/wts-nova-logo-nav.webp",
};
