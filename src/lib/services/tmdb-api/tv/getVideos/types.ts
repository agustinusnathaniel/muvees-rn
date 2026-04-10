export type TvVideosResponse = {
  id: number;
  results: Array<{
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: 'YouTube' | 'Vimeo';
    size: number;
    type: string;
  }>;
};
