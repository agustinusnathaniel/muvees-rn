import { useGetAPI } from '@/lib/services/tmdb-api/hooks'
import type { MovieListResponse, TMovieListParams, UseGetMovieListParams } from './types'

const SEARCH_RESOURCE_PATH = `/search/movie`
const DISCOVER_RESOURCE_PATH = `/discover/movie`

const movieListEndpoint = ({ section, query, with_genres }: TMovieListParams) => {
  if (query) {
    return SEARCH_RESOURCE_PATH
  }
  if (with_genres) {
    return DISCOVER_RESOURCE_PATH
  }
  return `/movie/${section}`
}

export const useGetMovieList = ({ section, params, isReady }: UseGetMovieListParams) =>
  useGetAPI<MovieListResponse>({
    path: movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    config: {
      params,
    },
    isReady,
  })

export const useMovieRecommendations = (id: number) =>
  useGetAPI<MovieListResponse>({ path: `/movie/${id}/recommendations` })
