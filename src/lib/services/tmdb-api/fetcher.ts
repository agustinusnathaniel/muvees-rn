import { TMDB_API_KEY, TMDB_API_URL } from '@/lib/constants/env'
import axios, { AxiosRequestConfig } from 'axios'

// Fetcher Config
export const service = axios.create({
  baseURL: TMDB_API_URL,
  timeout: 60000,
})

service.interceptors.request.use((config) => {
  const params = { ...config.params, api_key: TMDB_API_KEY }
  config.params = params
  return config
})

// Fetchers

export type APIFetcherParams = {
  path: string
  config?: AxiosRequestConfig
}

export const getAPI = <ResType = unknown>({ path, config }: APIFetcherParams) =>
  service.get<ResType>(path, config).then((res) => res.data)

export type PostAPIParams<ReqType> = APIFetcherParams & {
  requestBody?: ReqType
}

export const postAPI = <ResType, ReqType = unknown>({
  path,
  requestBody,
  config,
}: PostAPIParams<ReqType>) => service.post<ResType>(path, requestBody, config)
