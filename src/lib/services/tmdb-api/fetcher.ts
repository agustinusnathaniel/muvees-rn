import { Env } from '@env';
import ky, { type Options } from 'ky';

// Fetcher Config
const service = ky.create({
  prefix: Env.API_URL,
  timeout: 60000,
});

// Fetchers

export type APIFetcherParams = {
  path: string;
  config?: Options;
};

export const getAPI = async <ResType = unknown>({
  path,
  config,
}: APIFetcherParams): Promise<ResType> => {
  const response = await service.get(path, config);
  return response.json<ResType>();
};

export type PostAPIParams<ReqType> = APIFetcherParams & {
  requestBody?: ReqType;
};

// export const postAPI = <ResType, ReqType = unknown>({
//   path,
//   requestBody,
//   config,
// }: PostAPIParams<ReqType>) => service.post(path, { json: requestBody, ...config }).json<ResType>();
