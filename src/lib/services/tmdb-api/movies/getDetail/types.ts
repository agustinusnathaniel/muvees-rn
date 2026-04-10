import type { MovieListItemType } from '@/lib/services/tmdb-api/movies/getList/types';

type GenreType = {
  id: number;
  name: string;
};

type ProductionCompanyType = {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
};

type ProductionCountryType = {
  iso_3166_1: string;
  name: string;
};

type LanguageType = {
  iso_639_1: string;
  name: string;
};

export type MovieDetailResponse = Omit<MovieListItemType, 'genre_ids'> & {
  belongs_to_collection?: Record<string, unknown>;
  budget: number;
  genres: Array<GenreType>;
  homepage?: string;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  production_companies: Array<ProductionCompanyType>;
  production_countries: Array<ProductionCountryType>;
  revenue: number;
  runtime?: number;
  spoken_languages: Array<LanguageType>;
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  tagline?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
};

export type UseGetMovieDetailParams = {
  id: string;
  isReady?: boolean;
};

export type CreditPersonType = {
  id: number;
  name: string;
  character?: string;
  department?: string;
  job?: string;
  profile_path?: string | null;
  order?: number;
};

export type MovieCreditsResponse = {
  id: number;
  cast: Array<CreditPersonType>;
  crew: Array<CreditPersonType>;
};

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

export type SimilarMovieListResponse = {
  id: number;
  page: number;
  results: Array<{
    id: number;
    title: string;
    overview: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    vote_average: number;
    vote_count: number;
    release_date: string;
    adult: boolean;
    original_language: string;
    original_title: string;
    popularity: number;
    genre_ids: Array<number>;
    video: boolean;
  }>;
  total_pages: number;
  total_results: number;
};
