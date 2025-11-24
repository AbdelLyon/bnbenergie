import { ImageResponse } from 'next/og';

export const alt =
  'Installation Panneaux Solaires à Bourg-en-Bresse (01) - Expert Photovoltaïque Ain';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(251,191,36,0.6)',
          }}
        >
          ☀️
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Installation de Panneaux Solaires
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            marginBottom: '40px',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Bourg-en-Bresse • Ain (01)
        </div>

        <div
          style={{
            fontSize: 36,
            textAlign: 'center',
            opacity: 0.95,
          }}
        >
          Expert Photovoltaïque Certifié RGE
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: 32,
            background: '#fbbf24',
            color: '#1e3a8a',
            padding: '20px 50px',
            borderRadius: '50px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          Devis Gratuit
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
