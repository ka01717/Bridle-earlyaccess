// src/lib/early-access.ts
import { siteConfig } from '@/config';

export interface EarlyAccessData {
  name?: string;
  email: string;
  company?: string;
  intent?: string;
}

export interface EarlyAccessResult {
  success: boolean;
  message: string;
  isDevNotice?: boolean;
}

/**
 * Submit early access request.
 * Dispatches to /api/early-access (configured in siteConfig).
 */
export async function submitEarlyAccess(
  data: EarlyAccessData
): Promise<EarlyAccessResult> {
  const endpoint = siteConfig.earlyAccessEndpoint;

  // If a destination endpoint is configured, POST to it
  if (endpoint && endpoint.trim().length > 0) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name?.trim() || null,
          email: data.email.trim(),
          company: data.company?.trim() || null,
          intent: data.intent?.trim() || null,
          submittedAt: new Date().toISOString(),
        }),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok) {
        return {
          success: false,
          message:
            resData?.message || 'Something went wrong. Please try again.',
        };
      }

      return {
        success: true,
        message: resData?.message || "Thanks. We'll be in touch.",
      };
    } catch {
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    }
  }

  // Fallback if endpoint is unset
  if (process.env.NODE_ENV !== 'production') {
    console.info('[Bridle Early Access Dev Submission] Received submission at', new Date().toISOString());

    return {
      success: true,
      isDevNotice: true,
      message: "You're on the list. We'll be in touch as Bridle takes shape.",
    };
  }

  return {
    success: false,
    message: 'Submission service is not configured. Please try again.',
  };
}
