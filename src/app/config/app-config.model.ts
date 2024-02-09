export interface Config {
  endPointUrl: string;
  languages: string[];
  defaultLanguage: string;
  languageMatch: string;
  redirectUri: string;
  stream_app_key: string;
  stream_app_id: string;
  newApplicantStatus: number;
  newRespondStatus: number;
  newSupplyRequestStatus: number;
  postedSupplyRequestStatus: number;
  defaultPostTypeId: number;
  defaultReviewTypeId: number;
  giphyKey: string;
}
