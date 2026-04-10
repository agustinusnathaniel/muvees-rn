export type PersonDetailResponse = {
  adult: boolean;
  also_known_as: Array<string>;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
};

export type PersonCreditsResponse = {
  id: number;
  cast: Array<{
    id: number;
    title?: string;
    name?: string;
    character: string;
    media_type: 'movie' | 'tv';
    poster_path?: string | null;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: Array<number>;
    adult?: boolean;
    original_language: string;
    original_title?: string;
    original_name?: string;
    popularity: number;
    video?: boolean;
    origin_country?: Array<string>;
    backdraft_path?: string | null;
  }>;
  crew: Array<{
    id: number;
    title?: string;
    name?: string;
    department: string;
    job: string;
    media_type: 'movie' | 'tv';
    poster_path?: string | null;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: Array<number>;
    adult?: boolean;
    original_language: string;
    original_title?: string;
    original_name?: string;
    popularity: number;
    video?: boolean;
    origin_country?: Array<string>;
    backdrop_path?: string | null;
  }>;
};

export type UseGetPersonDetailParams = {
  id: string;
  isReady?: boolean;
};
