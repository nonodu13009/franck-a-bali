import galleries from '@/content/galleries.json';

export type Image = {
    id: string;
    src: string;
    alt: { en: string; fr: string };
    width: number;
    height: number;
    price: number;
};

export type Series = {
    id: string;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
    coverImage: string;
    images: Image[];
};

export function getAllSeries(): Series[] {
    return galleries.series;
}

export function getSeriesById(id: string): Series | undefined {
    return galleries.series.find((s) => s.id === id);
}
