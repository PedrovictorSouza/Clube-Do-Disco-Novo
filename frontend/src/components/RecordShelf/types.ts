export interface CarouselItem {
  cover: string;
  artist: string;
}

export interface RecordShelfProps {
  carouselIndex: number;
  items: CarouselItem[];
  setCarouselIndex: (index: number) => void;
}
