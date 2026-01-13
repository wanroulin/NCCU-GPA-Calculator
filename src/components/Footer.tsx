'use client';

interface FooterProps {
  onPrivacyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  return (
    <div style={{
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#6b7280'
    }}>
      <p>© 2025 wanroulin. All rights reserved.</p>
      <p style={{ marginTop: '0.5rem' }}>
        <button 
          onClick={onPrivacyClick}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#6b7280', 
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0,
            font: 'inherit'
          }}
        >
          Privacy Policy
        </button>
      </p>
    </div>
  );
};

export default Footer;