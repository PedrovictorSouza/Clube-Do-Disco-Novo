import React from 'react';
import { EventData } from './types';
import styles from './Thumbnail.module.css';

interface ThumbnailProps {
    event: EventData;
    isActive?: boolean;
    onClick?: (event: EventData) => void;
    className?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ 
    event, 
    isActive = false, 
    onClick, 
    className = "" 
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div 
            className={`${styles.thumbnail} ${isActive ? styles.activeThumbnail : ''} ${className}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            aria-label={`Selecionar evento ${event.title}`}
        >
            <div className={styles.thumbnailImage}>
                <img 
                    src={event.coverImage} 
                    alt={`Capa do álbum ${event.albumTitle}`}
                    className={styles.coverImage}
                />
            </div>
            
            <div className={styles.thumbnailContent}>
                <h3 className={styles.thumbnailTitle}>{event.title}</h3>
                
                <div className={styles.thumbnailMetadata}>
                    <span className={styles.date}>{event.date}</span>
                    <span className={styles.time}>{event.time}</span>
                </div>
            </div>
        </div>
    );
};

export default Thumbnail;
