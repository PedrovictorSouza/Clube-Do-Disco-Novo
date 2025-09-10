import React, { useState } from 'react';
import { EventData } from './types';
import NetflixHero from './NetflixHero';
import ThumbnailGrid from './ThumbnailGrid';
import styles from './EventsSection.module.css';

const mockEvents: EventData[] = [
    {
        id: "evt-01",
        title: "O Álbum que inventou mil bandas",
        artist: "The Beatles",
        albumTitle: "Sgt. Pepper's Lonely Hearts Club Band",
        description: "Uma jornada através do álbum mais revolucionário da história do rock. Descubra como este disco mudou a música popular.",
        date: "05/08",
        time: "20:00h",
        price: "R$ 25,00",
        coverImage: "https://i.ibb.co/nsxZS4SB/cover-1.jpg",
        vinylImage: "https://i.ibb.co/qfHgPFB/vinyl-1.png",
        backgroundImage: "https://i.ibb.co/nsxZS4SB/cover-1.jpg",
        isFeatured: true,
        tags: ["Rock", "Psicodélico", "Clássico"]
    },
    {
        id: "evt-02",
        title: "O Album que nunca foi lançado",
        artist: "Lana Del Rey",
        albumTitle: "Born To Die",
        description: "Explore o mundo melancólico e cinematográfico de Lana Del Rey. Uma análise profunda de um dos álbuns mais icônicos da música pop.",
        date: "12/08",
        time: "20:00h",
        price: "R$ 30,00",
        coverImage: "https://i.ibb.co/twhXnwWV/cover-2.jpg",
        vinylImage: "https://i.ibb.co/RGDHLQTr/vinyl-2.png",
        backgroundImage: "https://i.ibb.co/twhXnwWV/cover-2.jpg",
        tags: ["Pop", "Indie", "Cinematográfico"]
    },
    {
        id: "evt-03",
        title: "O Album sem baixo",
        artist: "Metallica",
        albumTitle: "Garage Inc",
        description: "Mergulhe no mundo do metal com uma das bandas mais influentes do gênero. Uma noite dedicada aos covers e raridades do Metallica.",
        date: "19/08",
        time: "21:00h",
        price: "R$ 35,00",
        coverImage: "https://i.ibb.co/tpqtY03m/cover-3.jpg",
        vinylImage: "https://i.ibb.co/DfcDvTYQ/vinyl-3.png",
        backgroundImage: "https://i.ibb.co/tpqtY03m/cover-3.jpg",
        tags: ["Metal", "Heavy", "Covers"]
    },
    {
        id: "evt-04",
        title: "O Album misterioso",
        artist: "Black Flag",
        albumTitle: "My War",
        description: "Descubra a intensidade e a raiva do punk hardcore. Uma análise do álbum que definiu uma geração e influenciou o movimento punk.",
        date: "26/08",
        time: "16:00h",
        price: "R$ 28,00",
        coverImage: "https://i.ibb.co/rfs0qKLL/cover-4.jpg",
        vinylImage: "https://i.ibb.co/39t3TLCK/vinyl-4.png",
        backgroundImage: "https://i.ibb.co/rfs0qKLL/cover-4.jpg",
        tags: ["Punk", "Hardcore", "Underground"]
    }
];

interface EventsSectionProps {
    className?: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({ className = "" }) => {
    const [featuredEvent, setFeaturedEvent] = useState<EventData>(mockEvents[0]);
    const [activeEventId, setActiveEventId] = useState<string>(mockEvents[0].id);

    const handleFeaturedChange = (event: EventData) => {
        setFeaturedEvent(event);
        setActiveEventId(event.id);
    };

    const handleEventClick = (event: EventData) => {
        console.log('Evento clicado:', event);

    };

    const handleThumbnailSelect = (event: EventData) => {
        setFeaturedEvent(event);
        setActiveEventId(event.id);
    };

    return (
        <div className={`${styles.eventsSection} ${className}`}>
            <NetflixHero 
                featuredEvent={featuredEvent}
                onEventClick={handleEventClick}
            />
            
            <ThumbnailGrid 
                events={mockEvents}
                activeEventId={activeEventId}
                onEventSelect={handleThumbnailSelect}
            />
        </div>
    );
};

export default EventsSection;
