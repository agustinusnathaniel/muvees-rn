export type VideoResultType = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: 'YouTube' | 'Vimeo';
  size: number;
  type:
    | 'Trailer'
    | 'Teaser'
    | 'Clip'
    | 'Featurette'
    | 'Opening Credits'
    | 'Behind the Scenes'
    | 'Bloopers';
};

export type MovieVideosResponse = {
  id: number;
  results: Array<VideoResultType>;
};
