import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "FOSSRadar.in - India's Open Source Directory";
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
            }}
          >
            📡
          </div>
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            fossradar
          </div>
        </div>
        <div
          style={{
            fontSize: '40px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          India's Open Source Directory
        </div>
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          Discover · Explore · Contribute
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
