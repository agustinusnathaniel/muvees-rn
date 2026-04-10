import type { TvListItemType } from '@/lib/services/tmdb-api/tv/getList/types';

type GenreType = {
  id: number;
  name: string;
};

type NetworkType = {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
};

type LanguageType = {
  iso_639_1: string;
  name: string;
};

type EpisodeType = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  still_path?: string | null;
  vote_average: number;
  vote_count: number;
};

type SeasonType = {
  air_date?: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string | null;
  season_number: number;
  vote_average: number;
  episodes?: Array<EpisodeType>;
};

export type TvDetailResponse = Omit<TvListItemType, 'genre_ids'> & {
  adult?: boolean;
  backdrop_path?: string | null;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path?: string | null;
  }>;
  episode_run_time: Array<number>;
  first_air_date: string;
  genres: Array<GenreType>;
  homepage: string;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air?: EpisodeType;
  name: string;
  networks: Array<NetworkType>;
  next_episode_to_air?: EpisodeType;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  production_companies: Array<{
    id: number;
    logo_path?: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons: Array<SeasonType>;
  spoken_languages: Array<LanguageType>;
  status: string;
  tagline?: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type UseGetTvDetailParams = {
  id: string;
  isReady?: boolean;
};
