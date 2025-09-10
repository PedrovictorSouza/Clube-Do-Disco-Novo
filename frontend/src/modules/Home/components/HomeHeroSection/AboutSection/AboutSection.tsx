import React from 'react';
import styles from './AboutSection.module.css';

export interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = "" }) => {
  return (
    <div className={`${styles.aboutSection} ${className}`}>
      {}
      <div className={styles.heroBackground} />
      
      {}
      <div className={styles.content}>
        {}
        <div className={styles.header}>
          <h1 className={styles.title}>Que clube é esse?</h1>
        </div>

        {}
        <div className={styles.mainMessage}>
         
          <p className={styles.messageText}>
            É uma experiência. Cada disco conta uma história, cada música desperta uma emoção. 
            Aqui, você não apenas ouve - você sente, vive e compartilha a magia do vinil.
          </p>
        </div>

        

        {}
        <div className={styles.cta}>
          <button className={styles.ctaButton}>
            Participe do Próximo Evento
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;