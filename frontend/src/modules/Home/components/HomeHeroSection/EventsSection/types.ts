export interface EventData {
    id: string;
    title: string;
    artist: string;
    albumTitle: string;
    description: string;
    date: string;
    time: string;
    price: string;
    coverImage: string;
    vinylImage: string;
    backgroundImage: string;
    isFeatured?: boolean;
    tags?: string[];
}

export interface NetflixHeroProps {
    featuredEvent: EventData;
    onEventClick?: (event: EventData) => void;
}

export interface EventCarouselProps {
    events: EventData[];
    onEventClick?: (event: EventData) => void;
    onFeaturedChange?: (event: EventData) => void;
}

export interface EventCardProps {
    event: EventData;
    isActive?: boolean;
    onClick?: (event: EventData) => void;
}

export interface ThumbnailProps {
    event: EventData;
    isActive?: boolean;
    onClick?: (event: EventData) => void;
    className?: string;
}

export interface ThumbnailGridProps {
    events: EventData[];
    activeEventId?: string;
    onEventSelect?: (event: EventData) => void;
    className?: string;
}
