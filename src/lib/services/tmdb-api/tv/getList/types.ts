import type { TmdbAPIListResponse } from '@/lib/services/tmdb-api/types';

export type UseGetTvListParams = {
  section: TvListType;
  params?: TvListParams;
  isReady?: boolean;
};

export type TvListType =
  | 'airing_today'
  | 'on_the_air'
  | 'popular'
  | 'top_rated';

export type TvListParams = {
  language?: string;
  page?: number;
  query?: string;
  with_genres?: string | string[];
};

export type TTvListParams = Pick<TvListParams, 'query' | 'with_genres'> & {
  section: TvListType;
};

export type TvListItemType = {
  poster_path?: string | null;
  adult?: boolean;
  overview: string;
  first_air_date: string;
  genre_ids: Array<number>;
  id: number;
  original_name: string;
  original_language: string;
  origin_country: Array<string>;
  name: string;
  backdrop_path?: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
};

export type TvListResponse = TmdbAPIListResponse<TvListItemType>;
