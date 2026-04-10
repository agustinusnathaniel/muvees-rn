export type MultiSearchMovieResult = {
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
  media_type: 'movie';
};

export type MultiSearchTvResult = {
  id: number;
  name: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  popularity: number;
  genre_ids: Array<number>;
  adult: boolean;
  media_type: 'tv';
};

export type MultiSearchPersonResult = {
  id: number;
  name: string;
  profile_path?: string | null;
  popularity: number;
  adult: boolean;
  known_for_department: string;
  known_for: Array<{
    id: number;
    title?: string;
    name?: string;
    media_type: 'movie' | 'tv';
    poster_path?: string | null;
    overview: string;
    vote_average: number;
  }>;
  media_type: 'person';
};

export type MultiSearchResponse = {
  page: number;
  results: Array<
    MultiSearchMovieResult | MultiSearchTvResult | MultiSearchPersonResult
  >;
  total_pages: number;
  total_results: number;
};
