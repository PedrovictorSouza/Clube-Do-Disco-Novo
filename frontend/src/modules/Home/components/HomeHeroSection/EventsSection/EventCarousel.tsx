import React, { useState, useRef, useEffect } from 'react';
import { EventCarouselProps, EventData } from './types';
import EventCard from './EventCard';
import styles from './EventCarousel.module.css';

const EventCarousel: React.FC<EventCarouselProps> = ({ 
    events, 
    onEventClick, 
    onFeaturedChange 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (onFeaturedChange && events.length > 0) {
            onFeaturedChange(events[currentIndex]);
        }
    }, [currentIndex, events, onFeaturedChange]);

    const handleScroll = () => {
        if (!scrollContainerRef.current || isScrolling) return;
        
        setIsScrolling(true);
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.children[0]?.clientWidth || 0;
        const newIndex = Math.round(scrollLeft / (itemWidth + 16)); // 16px é o gap
        
        if (newIndex !== currentIndex && newIndex < events.length) {
            setCurrentIndex(newIndex);
        }
        
        setTimeout(() => setIsScrolling(false), 150);
    };

    const scrollToIndex = (index: number) => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const itemWidth = container.children[0]?.clientWidth || 0;
        const gap = 16; // 1rem = 16px
        const scrollLeft = index * (itemWidth + gap);
        
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    };

    const handleCardClick = (event: EventData, index: number) => {
        scrollToIndex(index);
        if (onEventClick) {
            onEventClick(event);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
            
            <div className={styles.carouselWrapper}>
                <div 
                    ref={scrollContainerRef}
                    className={styles.carousel}
                    onScroll={handleScroll}
                >
                    {events.map((event, index) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            isActive={index === currentIndex}
                            onClick={(event) => handleCardClick(event, index)}
                        />
                    ))}
                </div>
                
                {}
                <button 
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                    aria-label="Evento anterior"
                >
                    ‹
                </button>
                
                <button 
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={() => scrollToIndex(Math.min(events.length - 1, currentIndex + 1))}
                    disabled={currentIndex === events.length - 1}
                    aria-label="Próximo evento"
                >
                    ›
                </button>
            </div>
            
            {}
            <div className={styles.dotsContainer}>
                {events.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                        onClick={() => scrollToIndex(index)}
                        aria-label={`Ir para evento ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventCarousel;
