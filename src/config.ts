// src/config.ts — Site-level configuration
export interface SiteConfig {
  /** Contact email — company email */
  contactEmail: string;
  /** Early access notification recipient email */
  notificationEmail: string;
  /** Early access form endpoint — webhook or API route */
  earlyAccessEndpoint: string;
  /** Canonical site URL */
  siteUrl: string;
}

export const siteConfig: SiteConfig = {
  // NOTE: Set NEXT_PUBLIC_CONTACT_EMAIL and NOTIFICATION_EMAIL in .env.local or hosting platform before deployment.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'k.bridleteam@gmail.com',
  notificationEmail: process.env.NOTIFICATION_EMAIL || 'k.bridleteam@gmail.com',
  earlyAccessEndpoint: process.env.NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT || '/api/early-access',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bridle.ai',
};
