import { Env } from '@env';
import axios, { type AxiosRequestConfig } from 'axios';

// Fetcher Config
export const service = axios.create({
  baseURL: Env.API_URL,
  timeout: 60000,
});

// Fetchers

export type APIFetcherParams = {
  path: string;
  config?: AxiosRequestConfig;
};

export const getAPI = <ResType = unknown>({ path, config }: APIFetcherParams) =>
  service.get<ResType>(path, config).then((res) => res.data);

export type PostAPIParams<ReqType> = APIFetcherParams & {
  requestBody?: ReqType;
};

export const postAPI = <ResType, ReqType = unknown>({
  path,
  requestBody,
  config,
}: PostAPIParams<ReqType>) => service.post<ResType>(path, requestBody, config);
