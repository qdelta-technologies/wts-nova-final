// Keep only verified external destinations here. Missing contact destinations
// fall back to the on-page contact form; missing social links are omitted.
const whatsappMessage = encodeURIComponent("Hi WTS Nova! I'd love to learn more about your services. Could you share some details?");

export const siteLinks: {
  talk: string | null;
  whatsapp: string | null;
  instagram: string | null;
  work: string | null;
  logo: string | null;
  navLogo: string | null;
} = {
  talk: null,
  whatsapp: `https://wa.me/917989578194?text=${whatsappMessage}`,
  instagram: "https://www.instagram.com/wtsnova/",
  work: null,
  // Display-resolution lossless copy of the supplied artwork (288px covers 3x at the
  // 94px navbar/footer size). The untouched full-resolution files stay in public/images.
  logo: "/images/wts-nova-logo-nav.webp",
  navLogo: "/images/wts-nova-logo-nav.webp",
};
