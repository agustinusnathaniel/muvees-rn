export type TvSimilarResponse = {
  id: number;
  page: number;
  results: Array<{
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
  }>;
  total_pages: number;
  total_results: number;
};
