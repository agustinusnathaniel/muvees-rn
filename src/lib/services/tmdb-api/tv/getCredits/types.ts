export type CreditPersonType = {
  id: number;
  name: string;
  character?: string;
  department?: string;
  job?: string;
  profile_path?: string | null;
  order?: number;
};

export type TvCreditsResponse = {
  id: number;
  cast: Array<CreditPersonType>;
  crew: Array<CreditPersonType>;
};
