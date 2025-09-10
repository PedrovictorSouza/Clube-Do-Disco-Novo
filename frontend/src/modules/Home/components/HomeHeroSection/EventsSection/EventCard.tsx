import React from 'react';
import { EventCardProps } from './types';
import styles from './EventCard.module.css';

const EventCard: React.FC<EventCardProps> = ({ event, isActive, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div 
            className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
            onClick={handleClick}
        >
            <div className={styles.cardImage}>
                <img 
                    src={event.coverImage} 
                    alt={`Capa do álbum ${event.albumTitle}`}
                    className={styles.coverImage}
                />
            </div>
            
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{event.title}</h3>
            </div>
        </div>
    );
};

export default EventCard;
