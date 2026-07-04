import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import '../styles/main.css';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary-600), var(--primary-900))',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '500px'
      }}>
        <h1 style={{
          fontSize: '8rem',
          fontWeight: '800',
          lineHeight: 1,
          margin: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 30px rgba(0,0,0,0.2)'
        }}>404</h1>

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          marginTop: '1rem'
        }}>Page Not Found</h2>

        <p style={{
          fontSize: '1rem',
          opacity: 0.85,
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: 'white',
              color: 'var(--primary-700)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all var(--transition)'
            }}
          >
            <Home size={18} />
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition)'
            }}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
