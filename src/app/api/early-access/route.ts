import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface EarlyAccessPayload {
  name?: string;
  email?: string;
  company?: string;
  intent?: string;
  submittedAt?: string;
  _hp?: string;
}

interface StoredSubmission {
  name: string | null;
  email: string;
  company: string | null;
  intent: string | null;
  submittedAt: string;
  dispatchedTo: string;
  companyEmail: string;
}

// In-memory rate limiting store (IP -> count & resetTime)
// NOTE: This in-memory store is a stopgap. In serverless environments (e.g. Vercel),
// memory resets on every cold start and does not work across multiple instances.
// Before real launch, a durable option (Vercel KV, Upstash Redis, or similar) should be implemented.
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

function getSubmissionsFilePath(): string {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'early-access-submissions.json');
}

function readSubmissions(): StoredSubmission[] {
  try {
    const filePath = getSubmissionsFilePath();
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[Early Access Read Warning]', err instanceof Error ? err.message : 'Read error');
    return [];
  }
}

function appendSubmission(record: StoredSubmission) {
  try {
    const filePath = getSubmissionsFilePath();
    const current = readSubmissions();
    current.push(record);
    fs.writeFileSync(filePath, JSON.stringify(current, null, 2), 'utf8');
  } catch (err) {
    console.error('[Early Access Save Error]', err instanceof Error ? err.message : 'Save error');
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (stopgap: 5 requests per 10 minutes)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: EarlyAccessPayload = await req.json().catch(() => ({}));

    // 2. Server-Side Honeypot Check
    // If honeypot is populated, fake success without storing data or triggering notifications
    const honeypot = typeof body._hp === 'string' ? body._hp.trim() : '';
    if (honeypot.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thanks. We'll be in touch.",
      });
    }

    const name = body.name?.trim() || null;
    const email = body.email?.trim();
    const company = body.company?.trim() || null;
    const intent = body.intent?.trim() || null;
    const submittedAt = body.submittedAt || new Date().toISOString();

    // 3. Basic Email Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 4. Input Length Limits
    if (
      (name && name.length > 255) ||
      email.length > 255 ||
      (company && company.length > 255) ||
      (intent && intent.length > 2000)
    ) {
      return NextResponse.json(
        { success: false, message: 'Input exceeds maximum allowed length.' },
        { status: 400 }
      );
    }

    // NOTE: Replace fallback placeholders with real environment variables before deployment
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL || 'k.bridleteam@gmail.com';
    const companyEmail =
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'k.bridleteam@gmail.com';

    const submissionRecord: StoredSubmission = {
      name,
      email,
      company,
      intent,
      submittedAt,
      dispatchedTo: notificationEmail,
      companyEmail,
    };

    // 5. Non-identifying Server Log (Strip all PII)
    console.info('[Bridle Early Access] Submission received');

    // 6. Persist to local JSON file
    appendSubmission(submissionRecord);

    // 7. Dispatch via Resend API (if configured)
    let emailDispatched = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from:
              process.env.EMAIL_FROM || 'Bridle Access <onboarding@resend.dev>',
            to: [notificationEmail],
            reply_to: email,
            subject: `New Bridle Early Access Request: ${email}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 6px;">
                <h2 style="color: #0D0E11; margin-top: 0; font-size: 20px;">New Early Access Request</h2>
                <p style="color: #4A4E57; font-size: 14px; margin-bottom: 20px;">Someone just submitted the early access form on Bridle:</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #8A8E97; width: 140px;">Applicant Email:</td>
                    <td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #0D0E11; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8A8E97;">Company:</td>
                    <td style="padding: 8px 0; color: #0D0E11;">${company || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8A8E97; vertical-align: top;">Intended Actions:</td>
                    <td style="padding: 8px 0; color: #0D0E11;">${intent || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8A8E97;">Submitted At:</td>
                    <td style="padding: 8px 0; color: #0D0E11;">${submittedAt}</td>
                  </tr>
                </table>
                <hr style="border: none; border-top: 1px solid #eaeaea; margin: 24px 0;" />
                <p style="font-size: 12px; color: #8A8E97; margin: 0;">Company Contact: ${companyEmail}</p>
              </div>
            `,
          }),
        });

        if (res.ok) {
          emailDispatched = true;
          console.info('[Bridle Early Access] Notification email dispatched');
        } else {
          const errData = await res.json().catch(() => null);
          console.warn('[Early Access Resend Error]', errData?.message || 'Dispatch failed');
        }
      } catch (resendErr) {
        console.warn('[Early Access Resend Network Error]', resendErr instanceof Error ? resendErr.message : 'Network error');
      }
    }

    // 8. Webhook dispatch (e.g. Zapier, Slack, Discord)
    if (process.env.EARLY_ACCESS_WEBHOOK_URL) {
      try {
        await fetch(process.env.EARLY_ACCESS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionRecord),
        });
      } catch (webhookErr) {
        console.warn('[Early Access Webhook Dispatch Error]', webhookErr instanceof Error ? webhookErr.message : 'Webhook error');
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks. We'll be in touch.",
      dispatched: emailDispatched,
    });
  } catch (error) {
    console.error('[Bridle Early Access API Error]', error instanceof Error ? error.message : 'Internal error');
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
