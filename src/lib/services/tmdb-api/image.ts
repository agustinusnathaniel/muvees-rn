const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const TMDB_IMAGE_SIZES = {
  backdrop: 'w780',
  poster: 'w500',
  profile: 'w185',
} as const;

type TmdbImageSize = (typeof TMDB_IMAGE_SIZES)[keyof typeof TMDB_IMAGE_SIZES];

export const buildTmdbImageUrl = (
  path: string | null | undefined,
  size: TmdbImageSize,
) => (path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : undefined);
