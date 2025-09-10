import React from 'react';
import styles from './ContactSection.module.css';

export interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  return (
    <div className={`${styles.contactSection} ${className}`}>
      {}
      <div className={styles.heroBackground} />
      
      {}
      <div className={styles.content}>
        {}
        <div className={styles.header}>
          <h1 className={styles.title}>Entre em Contato</h1>
        </div>

        {}
        <div className={styles.mainMessage}>
          <p className={styles.messageText}>
            Quer participar dos nossos eventos? Tem alguma sugestão de álbum? 
            Ou simplesmente quer trocar uma ideia sobre música? Estamos aqui para isso!
          </p>
        </div>

        {}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            width: '100%'
          }}
        >
          <a 
            href="mailto:contato@clubedodisco.com" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '16px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#ffffff',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              minWidth: '200px',
              justifyContent: 'center',
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: '200px',
              maxWidth: '300px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className={styles.contactIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <span>contato@clubedodisco.com</span>
          </a>
          
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '16px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#ffffff',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              minWidth: '200px',
              justifyContent: 'center',
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: '200px',
              maxWidth: '300px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className={styles.contactIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <span>(11) 99999-9999</span>
          </a>
          
          <a 
            href="https://maps.google.com/?q=São+Paulo,SP" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '16px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#ffffff',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              minWidth: '200px',
              justifyContent: 'center',
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: '200px',
              maxWidth: '300px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className={styles.contactIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span>São Paulo, SP</span>
          </a>
        </div>

        {}
        <div className={styles.cta}>
          <button className={styles.ctaButton}>
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;