import { ImageResponse } from 'next/og';

export const alt = 'Bridle — Describe the work. Bridle builds the rest.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0D0E11',
          padding: '72px',
          fontFamily: 'sans-serif',
          color: '#F6F4EF',
        }}
      >
        {/* Top: Monospace category and Rein Line brand mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Bridle rein mark */}
            <svg
              width="36"
              height="20"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="7"
                x2="8"
                y2="7"
                stroke="#A8834A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="7"
                r="3.5"
                stroke="#A8834A"
                strokeWidth="1.5"
                fill="none"
              />
              <line
                x1="16"
                y1="7"
                x2="23"
                y2="7"
                stroke="#A8834A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#F6F4EF',
              }}
            >
              Bridle
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontFamily: 'monospace',
              color: '#A8834A',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>DESCRIBE THE WORK. BRIDLE BUILDS THE REST.</span>
          </div>
        </div>

        {/* Center: Headline & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '54px',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#F6F4EF',
              maxWidth: '920px',
            }}
          >
            Describe the work. Bridle builds the rest.
          </div>
          <div
            style={{
              fontSize: '22px',
              lineHeight: 1.45,
              color: '#8A8E97',
              maxWidth: '840px',
            }}
          >
            Tell Bridle what you need done. It builds the AI agent and the infrastructure
            to run it safely: connections, permissions, approvals, testing and verification.
          </div>
        </div>

        {/* Bottom Bar: Rein line running across */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontFamily: 'monospace',
              color: '#8A8E97',
            }}
          >
            <span>bridle.ai</span>
            <span>·</span>
            <span>In early development</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontFamily: 'monospace',
              color: '#A8834A',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#A8834A',
              }}
            />
            <span>ZERO DIRECT ACCESS</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
