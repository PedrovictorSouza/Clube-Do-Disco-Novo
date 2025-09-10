import React from 'react';
import { NetflixHeroProps } from './types';
import styles from './NetflixHero.module.css';

const NetflixHero: React.FC<NetflixHeroProps> = ({ featuredEvent, onEventClick }) => {
    const handlePlayClick = () => {
        if (onEventClick) {
            onEventClick(featuredEvent);
        }
    };

    return (
        <div className={styles.heroContainer}>
            {}
            <div 
                className={styles.heroBackground}
                style={{
                    backgroundImage: `url(${featuredEvent.backgroundImage})`,
                }}
            />
            
            {}
            <div className={styles.gradientOverlay} />
            
            {}
            <div className={styles.heroContent}>
                <div className={styles.heroInfo}>
                    {}
                    <div className={styles.branding}>
                        <span className={styles.category}>EVENTO</span>
                    </div>
                    
                    {}
                    <h1 className={styles.title}>{featuredEvent.title}</h1>
                    
                    {}
                    <button 
                        className={styles.playButton}
                        onClick={handlePlayClick}
                        aria-label={`Saiba mais sobre ${featuredEvent.title}`}
                    >
                        Saiba Mais
                    </button>
                    
                    {}
                    <div className={styles.eventInfo}>
                        <div className={styles.eventDetails}>
                            <span className={styles.date}>{featuredEvent.date}</span>
                            <span className={styles.time}>{featuredEvent.time}</span>
                            <span className={styles.price}>{featuredEvent.price}</span>
                        </div>
                    </div>
                    
                    {}
                    <p className={styles.description}>
                        {featuredEvent.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NetflixHero;
