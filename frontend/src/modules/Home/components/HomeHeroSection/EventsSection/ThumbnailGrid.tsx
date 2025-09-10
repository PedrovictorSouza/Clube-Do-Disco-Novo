import React from 'react';
import { EventData } from './types';
import Thumbnail from './Thumbnail';
import styles from './ThumbnailGrid.module.css';

interface ThumbnailGridProps {
    events: EventData[];
    activeEventId?: string;
    onEventSelect?: (event: EventData) => void;
    className?: string;
}

const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({
    events,
    activeEventId,
    onEventSelect,
    className = ""
}) => {
    const handleThumbnailClick = (event: EventData) => {
        if (onEventSelect) {
            onEventSelect(event);
        }
    };

    return (
        <div className={`${styles.thumbnailGrid} ${className}`}>
            <h2 className={styles.sectionTitle}>Todos os Eventos</h2>
            <div className={styles.gridContainer}>
                {events.map((event) => (
                    <Thumbnail
                        key={event.id}
                        event={event}
                        isActive={event.id === activeEventId}
                        onClick={handleThumbnailClick}
                        className={styles.thumbnailItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThumbnailGrid;
